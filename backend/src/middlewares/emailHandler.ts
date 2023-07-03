import nodemailer from "nodemailer"
import { NextFunction, Request, Response } from "express"
import handlebars from "handlebars"
import { EventWithOrganiser } from "../interfaces/event"
import { UserWithFireId } from "../interfaces/user"
import mssql from "mssql"
import { pool } from "../utils/dbConfig"
import { DbTables } from "../utils/constant"
import { readFile } from "fs/promises"
import { user, trans_obj } from "../utils/email"
import { generateCertificate } from "./certificate"

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

export const reminderEmail = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	// let transporter = nodemailer.createTransport(trans_obj)
	// readFile(
	// 	"./src/utils/template/reminder.html",
	// 	"utf8",
	// 	(err, htmlTemplate) => {
	// 		if (err) {
	// 			console.error("Error reading HTML file:", err)
	// 			return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
	// 		}
	// 		const template = handlebars.compile(htmlTemplate)
	// 		const data = {
	// 			name: "John Doe",
	// 			eventName:
	// 				"Tech Talk: Exploring the Future of Artificial Intelligence",
	// 		}
	// 		const mail = template(data)
	// 		let message = {
	// 			from: user,
	// 			to: ["xlee0024@student.monash.edu"],
	// 			subject:
	// 				"Reminder: SEMS - Important Information before joining the event",
	// 			html: mail,
	// 		}
	// 		transporter
	// 			.sendMail(message)
	// 			.then(() => {
	// 				return res.sendStatus(StatusCodes.OK)
	// 			})
	// 			.catch(() => {
	// 				return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
	// 			})
	// 	}
	// )
}

export const postEventEmail = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	// let transporter = nodemailer.createTransport(trans_obj)
	// readFile(
	// 	"./src/utils/template/postEvent.html",
	// 	"utf8",
	// 	(err, htmlTemplate) => {
	// 		if (err) {
	// 			console.error("Error reading HTML file:", err)
	// 			return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
	// 		}
	// 		const template = handlebars.compile(htmlTemplate)
	// 		const data = {
	// 			name: "John Doe",
	// 			eventName:
	// 				"Tech Talk: Exploring the Future of Artificial Intelligence",
	// 		}
	// 		const mail = template(data)
	// 		let message = {
	// 			from: user,
	// 			to: ["xlee0024@student.monash.edu"],
	// 			subject:
	// 				"Your Feedback Matters! Share Your Experience of the event that you've joined!",
	// 			html: mail,
	// 		}
	// 		transporter
	// 			.sendMail(message)
	// 			.then(() => {
	// 				return res.sendStatus(StatusCodes.OK)
	// 			})
	// 			.catch(() => {
	// 				return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
	// 			})
	// 	}
	// )
}

export const approveEventEmail = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	// let transporter = nodemailer.createTransport(trans_obj)
	// readFile(
	// 	"./src/utils/template/approveEvent.html",
	// 	"utf8",
	// 	(err, htmlTemplate) => {
	// 		if (err) {
	// 			console.error("Error reading HTML file:", err)
	// 			return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
	// 		}
	// 		const template = handlebars.compile(htmlTemplate)
	// 		const data = {
	// 			name: "John Doe",
	// 			eventName:
	// 				"Tech Talk: Exploring the Future of Artificial Intelligence",
	// 		}
	// 		const mail = template(data)
	// 		let message = {
	// 			from: user,
	// 			to: ["xlee0024@student.monash.edu"],
	// 			subject: "SEMS - Event Approval Confirmation",
	// 			html: mail,
	// 		}
	// 		transporter
	// 			.sendMail(message)
	// 			.then(() => {
	// 				return res.sendStatus(StatusCodes.OK)
	// 			})
	// 			.catch(() => {
	// 				return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
	// 			})
	// 	}
	// )
}
