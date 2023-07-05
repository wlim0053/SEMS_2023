import nodemailer from "nodemailer"
import { NextFunction, Request, Response } from "express"
import handlebars from "handlebars"
import {
	EventWithOrganiser,
	EventWithOrganiserUser,
	EventWithUser,
} from "../interfaces/event"
import { UserWithFireId } from "../interfaces/user"
import mssql from "mssql"
import { pool } from "../utils/dbConfig"
import { DbTables } from "../utils/constant"
import { readFile } from "fs/promises"
import { user, trans_obj } from "../utils/email"
import path from "path"

export const registrationEmail = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const transporter = nodemailer.createTransport(trans_obj)
		const connection = await pool.connect()

		const event: mssql.IResult<EventWithOrganiserUser> = await connection
			.request()
			.input("event_uuid", mssql.UniqueIdentifier, req.body.event_uuid)
			.query(`
                    SELECT *
                    FROM ${DbTables.EVENT} e 
					JOIN ${DbTables.ORGANISER} o ON e.organiser_uuid=o.organiser_uuid
					JOIN ${DbTables.USER} u on o.user_fire_id = u.user_fire_id
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
			await readFile(
				path.resolve(__dirname, "../utils/template/registration.html"),
				"utf-8"
			)
		)

		const data = {
			name:
				userData.user_fname.toUpperCase() +
				" " +
				userData.user_lname.toUpperCase(),
			eventName: eventData.event_title.toUpperCase(),
			organiserEmail: eventData.user_email,
		}

		const mail = emailTemplate(data)

		await transporter.sendMail({
			from: user,
			to: userData.user_email,
			subject: "SEMS - Thank you for your registration!",
			html: mail,
		})
	} catch (error) {
		next(error)
	}
}

export const requestForFeedbackEmail = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const transporter = nodemailer.createTransport(trans_obj)
		const connection = await pool.connect()

		const eventWithUser: mssql.IResult<EventWithUser> = await connection
			.request()
			.input("event_uuid", mssql.UniqueIdentifier, req.params.id).query(`
                SELECT * 
                FROM ${DbTables.EVENT} e 
                JOIN ${DbTables.PARTICIPATION} p on e.event_uuid = p.event_uuid 
                JOIN ${DbTables.USER} u on p.user_fire_id = u.user_fire_id
                WHERE e.event_uuid=@event_uuid
            `)
		const eventWithUserData = eventWithUser.recordset

		const emailTemplate = handlebars.compile(
			await readFile(
				path.resolve(__dirname, "../utils/template/postEvent.html"),
				"utf-8"
			)
		)

		eventWithUserData.map(async (eventUserData) => {
			const data = {
				name:
					eventUserData.user_fname.toUpperCase() +
					" " +
					eventUserData.user_lname.toUpperCase(),
				eventName: eventUserData.event_title.toUpperCase(),
				feedbackLink: "https://www.monash.edu.my",
			}

			const mail = emailTemplate(data)

			await transporter.sendMail({
				from: user,
				to: eventUserData.user_email,
				subject:
					"SEMS - Your Feedback Matters! Share Your Experience of the event that you've joined!",
				html: mail,
			})
		})
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
			.input("event_uuid", mssql.UniqueIdentifier, req.params.id).query(`
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
			await readFile(
				isApproved
					? path.resolve(
							__dirname,
							"../utils/template/approveEvent.html"
					  )
					: path.resolve(
							__dirname,
							"../utils/template/rejectEvent.html"
					  ),
				"utf-8"
			)
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
			subject: isApproved
				? "SEMS - Event Approval Notice"
				: "SEMS - Event Rejection Notice",
			html: mail,
		})
	} catch (error) {
		next(error)
	}
}
