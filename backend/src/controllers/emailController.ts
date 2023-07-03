import { NextFunction, Request, Response } from "express"
import mssql from "mssql"
import { pool } from "../utils/dbConfig"
import { DbTables, StatusCodes } from "../utils/constant"
import nodemailer from "nodemailer"
import { user, trans_obj } from "../utils/email"
import { readFile } from "fs/promises"
import handlebars from 'handlebars'
import {
    EventWithUUID
} from "../interfaces/event"
import { ParticipationWithUUID } from "../interfaces/participation"
import { UserWithFireId } from "../interfaces/user"

export const createEmailReminderController = async (req: Request, res: Response, next: NextFunction) => {

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
            await readFile("./src/utils/template/reminder.html", "utf-8")
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
                eventPlatformLink: "https://www.monash.edu.my"
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