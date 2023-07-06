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
import { DbTables, StatusCodes } from "../utils/constant"
import { readFile } from "fs/promises"
import { user, trans_obj } from "../utils/email"
import path from "path"
import {
	CertificateDetails,
	CertificateCustomMessage,
} from "../interfaces/email"
import Mail from "nodemailer/lib/mailer"
import { generateCertificate } from "../middlewares/certificate"

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
				feedbackLink: "https://www.monash.edu.my", //TODO change link after deployment
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

export const isEventApprovedEmail = (approved: boolean) => {
	return async (req: Request, res: Response, next: NextFunction) => {
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
				await readFile(
					path.resolve(
						__dirname,
						approved
							? "../utils/template/approveEvent.html"
							: "../utils/template/rejectEvent.html"
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
				subject: approved
					? "SEMS - Event Approval Notice"
					: "SEMS - Event Rejection Notice",
				html: mail,
			})
		} catch (error) {
			next(error)
		}
	}
}

export const createEmailReminderController = async (
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
			await readFile("./src/utils/template/reminder.html", "utf-8")
		)

		eventWithUserData.map(async (eventUserData) => {
			const data = {
				name:
					eventUserData.user_fname.toUpperCase() +
					" " +
					eventUserData.user_lname.toUpperCase(),
				eventName: eventUserData.event_title.toUpperCase(),
				eventPlatformLink: "https://www.monash.edu.my", //TODO change link after deployment
			}

			const mail = emailTemplate(data)

			await transporter.sendMail({
				from: user,
				to: eventUserData.user_email,
				subject:
					"SEMS - Reminder: Important Information before joining the event",
				html: mail,
			})
		})
		res.sendStatus(StatusCodes.OK)
	} catch (error) {
		next(error)
	}
}

export const createEmailForCertController = async (
	req: Request<{ id: string }, {}, CertificateCustomMessage, {}>,
	res: Response<{}>,
	next: NextFunction
) => {
	try {
		const transporter = nodemailer.createTransport(trans_obj)
		const connection = await pool.connect()

		const eventWithUser: mssql.IResult<CertificateDetails> =
			await connection
				.request()
				.input("event_uuid", mssql.UniqueIdentifier, req.params.id)
				.query(`
                SELECT 
                    u.*,
                    e.*,
                    o.organiser_name
                FROM 
                    ${DbTables.PARTICIPATION} p 
                JOIN 
                    ${DbTables.FEEDBACK} f ON p.participation_uuid=f.participation_uuid
                JOIN
                    ${DbTables.EVENT} e ON p.event_uuid=e.event_uuid
                JOIN
                    ${DbTables.ORGANISER} o ON e.organiser_uuid=o.organiser_uuid
                JOIN
                    ${DbTables.USER} u ON p.user_fire_id=u.user_fire_id
                WHERE  
                    p.participation_attendance=1 AND e.event_uuid=@event_uuid
            `)

		connection.close()
		const certDetails = eventWithUser.recordset

		const emailTemplate = handlebars.compile(
			await readFile(
				path.resolve(__dirname, "../utils/template/emailForCert.html"),
				"utf-8"
			)
		)

		const emailPromises = certDetails.map(async (certDetail) => {
			const data = {
				name:
					certDetail.user_fname.toUpperCase() +
					" " +
					certDetail.user_lname.toUpperCase(),
				eventName: certDetail.event_title.toUpperCase(),
			}

			const mail = emailTemplate(data)
			const content = await generateCertificate({
				certDetail,
				customMessage: req.body.organisedBy,
			})

			const mailOptions: Mail.Options = {
				from: user,
				to: certDetail.user_email,
				subject: "SEMS - Certificate of Participation",
				html: mail,
				attachments: [{ filename: "certificate.pdf", content }],
			}

			return transporter.sendMail(mailOptions)
		})

		await Promise.all(emailPromises)
		res.sendStatus(StatusCodes.OK)
	} catch (error) {
		next(error)
	}
}
