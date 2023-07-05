import { NextFunction, Request, Response } from "express"
import mssql from "mssql"
import { pool } from "../utils/dbConfig"
import { DbTables, StatusCodes } from "../utils/constant"
import nodemailer from "nodemailer"
import { user, trans_obj } from "../utils/email"
import { readFile } from "fs/promises"
import handlebars from 'handlebars'
import { EventWithUser } from "../interfaces/event"

export const createEmailReminderController = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const transporter = nodemailer.createTransport(trans_obj);
        const connection = await pool.connect();

        const eventWithUser: mssql.IResult<EventWithUser> = await connection
            .request()
            .input("event_uuid", mssql.UniqueIdentifier, req.params.id)
            .query(`
                SELECT * 
                FROM ${DbTables.EVENT} e 
                JOIN ${DbTables.PARTICIPATION} p on e.event_uuid = p.event_uuid 
                JOIN ${DbTables.USER} u on p.user_fire_id = u.user_fire_id
                WHERE e.event_uuid=@event_uuid
            `);
        const eventWithUserData = eventWithUser.recordset; 

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
                eventPlatformLink: "https://www.monash.edu.my"
            }

            const mail = emailTemplate(data);

            await transporter.sendMail({
                from: user,
                to: eventUserData.user_email,
                subject: "Reminder: SEMS - Important Information before joining the event",
                html: mail,
            })
        });
		res.sendStatus(StatusCodes.OK)
    } catch (error) {
        next(error)
    }
}