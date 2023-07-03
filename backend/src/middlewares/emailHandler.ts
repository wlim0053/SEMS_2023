import nodemailer from "nodemailer"
import { NextFunction, Request, Response } from "express"
import handlebars from "handlebars"
import { EventWithOrganiser, EventWithUUID } from "../interfaces/event"
import { ParticipationWithUUID } from "../interfaces/participation"
import { UserWithFireId } from "../interfaces/user"
import mssql from "mssql"
import { pool } from "../utils/dbConfig"
import { DbTables } from "../utils/constant"
import { readFile } from "fs/promises"
import { user, trans_obj } from "../utils/email"

export const registrationEmail = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const transporter = nodemailer.createTransport(trans_obj)
		const connection = await pool.connect()

		const event: mssql.IResult<EventWithOrganiser> = await connection
			.request()
			.input("event_uuid", mssql.UniqueIdentifier, req.body.event_uuid)
			.query(`
                    SELECT 
                        e.*,
                        o.parent_uuid,
                        o.organiser_name,
                        user_fire_id
                    FROM 
                        ${DbTables.EVENT} e JOIN ${DbTables.ORGANISER} o ON e.organiser_uuid=o.organiser_uuid
                    WHERE 
                        event_uuid=@event_uuid
                `)
		const eventData = event.recordset[0] // only single value

		const user_example: mssql.IResult<UserWithFireId> = await connection
			.request()
			.input("user_fire_id", mssql.VarChar, req.body.user.user_fire_id)
			.query(`
                    SELECT * FROM ${DbTables.USER}
                    WHERE user_fire_id=@user_fire_id
                `)
		const userData = user_example.recordset[0] // only single value
		connection.close()

		const emailTemplate = handlebars.compile(
			await readFile("./src/utils/template/registration.html", "utf-8")
		)

		const data = {
			name:
				userData.user_fname.toUpperCase() +
				" " +
				userData.user_lname.toUpperCase(),
			eventName: eventData.event_title.toUpperCase(),
		}

		const mail = emailTemplate(data)

		await transporter.sendMail({
			from: user,
			to: [userData.user_email],
			subject: "Thank you for your registration!",
			html: mail,
		})
	} catch (error) {
		next(error)
	}
}

export const postEventEmail = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const transporter = nodemailer.createTransport(trans_obj);
		const connection = await pool.connect();

		const event: mssql.IResult<EventWithUUID> = await connection
			.request()
			.input("event_uuid", mssql.UniqueIdentifier, req.params.id)
			.query(`
                SELECT * FROM ${DbTables.EVENT}
                WHERE event_uuid=@event_uuid
            `);
		const eventData = event.recordset[0]; // only single value

		const userFromParticipation: mssql.IResult<ParticipationWithUUID> = await connection
			.request()
			.input("event_uuid", mssql.UniqueIdentifier, req.params.id)
			.query(`
                SELECT user_fire_id FROM ${DbTables.PARTICIPATION}
                WHERE event_uuid=@event_uuid
            `);

		const userFireIds = userFromParticipation.recordset
			.map((row) => row.user_fire_id)
			.filter((userFireId) => userFireId !== undefined) as string[];


		const emailTemplate = handlebars.compile(
			await readFile("./src/utils/template/postEvent.html", "utf-8")
		)

		userFireIds.map(async (userFireId) => {
			const user_example: mssql.IResult<UserWithFireId> = await connection
				.request()
				.input("user_fire_id", mssql.VarChar, userFireId)
				.query(`
                    SELECT * FROM ${DbTables.USER} 
                    WHERE user_fire_id=@user_fire_id
                `);
			const userData = user_example.recordset[0]; // only single value

			const data = {
				name:
					userData.user_fname.toUpperCase() +
					" " +
					userData.user_lname.toUpperCase(),
				eventName: eventData.event_title.toUpperCase(),
				feedbackLink: "https://www.monash.edu.my"
			}

			const mail = emailTemplate(data);

			await transporter.sendMail({
				from: user,
				to: userData.user_email,
				subject: "Reminder: SEMS - Important Information before joining the event",
				html: mail,
			})
		});
	} catch (error) {
		next(error)
	}
}

export const isEventApprovedEmail = async (
	req: Request,
	res: Response,
	next: NextFunction,
	isApproved: boolean
) => {
	try {
		const transporter = nodemailer.createTransport(trans_obj)
		const connection = await pool.connect()
		const event: mssql.IResult<EventWithOrganiser> = await connection
			.request()
			.input("event_uuid", mssql.UniqueIdentifier, req.params.id)
			.query(`
                    SELECT 
                        e.*,
                        o.parent_uuid,
                        o.organiser_name,
                        user_fire_id
                    FROM 
                        ${DbTables.EVENT} e JOIN ${DbTables.ORGANISER} o ON e.organiser_uuid=o.organiser_uuid
                    WHERE 
                        event_uuid=@event_uuid
                `)
		const eventData = event.recordset[0] // only single value

		const user_example: mssql.IResult<UserWithFireId> = await connection
			.request()
			.input("user_fire_id", mssql.VarChar, eventData.user_fire_id)
			.query(`
                    SELECT * FROM ${DbTables.USER}
                    WHERE user_fire_id=@user_fire_id
                `)
		const userData = user_example.recordset[0] // only single value
		connection.close()

		const emailTemplate = handlebars.compile(
			await readFile((isApproved ? "./src/utils/template/approveEvent.html" : "./src/utils/template/rejectEvent.html"), "utf-8")
		)

		const data = {
			name:
				userData.user_fname.toUpperCase() +
				" " +
				userData.user_lname.toUpperCase(),
			eventName: eventData.event_title.toUpperCase(),
		}

		const mail = emailTemplate(data)

		await transporter.sendMail({
			from: user,
			to: userData.user_email,
			subject: (isApproved ? "SEMS - Event Approval Confirmation" : "SEMS - Event Rejection Confirmation"),
			html: mail,
		})
	} catch (error) {
		next(error)
	}
}