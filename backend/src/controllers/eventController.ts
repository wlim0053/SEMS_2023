import { NextFunction, Request, Response } from "express"
import mssql from "mssql"
import { pool } from "../utils/dbConfig"
import { DbTables, StatusCodes } from "../utils/constant"
import { Event, EventWithOrganiser, EventWithUUID } from "../interfaces/event"
import { ParticipationWithUUID } from "../interfaces/participation"

export const createEventController = async (
	req: Request<{}, EventWithUUID[], Event>,
	res: Response<EventWithUUID[]>,
	next: NextFunction
) => {
	try {
		const connection = await pool.connect()
		const create: mssql.IResult<EventWithUUID> = await connection
			.request()
			.input("event_ems_no", mssql.VarChar, req.body.event_ems_no)
			.input(
				"organiser_uuid",
				mssql.UniqueIdentifier,
				req.body.organiser_uuid
			)
			.input(
				"event_start_date",
				mssql.SmallDateTime,
				req.body.event_start_date
			)
			.input(
				"event_end_date",
				mssql.SmallDateTime,
				req.body.event_end_date
			)
			.input("event_title", mssql.VarChar, req.body.event_title)
			.input("event_desc", mssql.VarChar, req.body.event_desc)
			.input("event_mode", mssql.Char, req.body.event_mode)
			.input("event_venue", mssql.VarChar, req.body.event_venue)
			.input("event_capacity", mssql.Int, req.body.event_capacity)
			.input("event_status", mssql.Char, req.body.event_status)
			.input(
				"event_reg_start_date",
				mssql.SmallDateTime,
				req.body.event_reg_start_date
			)
			.input(
				"event_reg_end_date",
				mssql.SmallDateTime,
				req.body.event_reg_end_date
			)
			.input(
				"event_reg_google_form",
				mssql.VarChar,
				req.body.event_reg_google_form
			).query(`
                INSERT INTO ${DbTables.EVENT} (event_ems_no, organiser_uuid, event_start_date, event_end_date, event_title, event_desc, event_mode, event_venue, event_capacity, event_status, event_reg_start_date, event_reg_end_date, event_reg_google_form)  
				OUTPUT INSERTED.*
				VALUES (
                    @event_ems_no,
                    @organiser_uuid,
                    @event_start_date,
                    @event_end_date,
                    @event_title,
                    @event_desc,
                    @event_mode,
                    @event_venue,
                    @event_capacity,
                    @event_status,
                    @event_reg_start_date,
                    @event_reg_end_date,
                    @event_reg_google_form
                )`)
		res.json(create.recordset)
		connection.close()
	} catch (error) {
		next(error)
	}
}

export const updateEventController = async (
	req: Request<{ id: string }, EventWithUUID[], Event>,
	res: Response<EventWithUUID[]>,
	next: NextFunction
) => {
	try {
		const connection = await pool.connect()
		const updated: mssql.IResult<EventWithUUID> = await connection
			.request()
			.input("event_uuid", mssql.UniqueIdentifier, req.params.id)
			.input("event_ems_no", mssql.VarChar, req.body.event_ems_no)
			.input(
				"organiser_uuid",
				mssql.UniqueIdentifier,
				req.body.organiser_uuid
			)
			.input(
				"event_start_date",
				mssql.SmallDateTime,
				req.body.event_start_date
			)
			.input(
				"event_end_date",
				mssql.SmallDateTime,
				req.body.event_end_date
			)
			.input("event_title", mssql.VarChar, req.body.event_title)
			.input("event_desc", mssql.VarChar, req.body.event_desc)
			.input("event_venue", mssql.VarChar, req.body.event_venue)
			.input("event_capacity", mssql.Int, req.body.event_capacity)
			.input("event_status", mssql.VarChar, req.body.event_status)
			.query(
				`UPDATE ${DbTables.EVENT} 
			        SET [event_ems_no] = @event_ems_no, 
                        [organiser_uuid] = @organiser_uuid,
                        [event_start_date] = @event_start_date, 
                        [event_end_date] = @event_end_date,
                        [event_title] = @event_title,
                        [event_desc] = @event_desc, 
                        [event_venue] = @event_venue,
                        [event_capacity] = @event_capacity, 
                        [event_status] = @event_status
				OUTPUT INSERTED.*
			    WHERE [event_uuid] = @event_uuid
			`
			)
		res.json(updated.recordset)
		connection.close()
	} catch (error) {
		next(error)
	}
}

export const getEventController = async (
	req: Request<{}, EventWithOrganiser[], {}>,
	res: Response<EventWithOrganiser[]>,
	next: NextFunction
) => {
	try {
		const connection = await pool.connect()
		const events: mssql.IResult<EventWithOrganiser> =
			await connection.query(
				`SELECT 
                event_uuid,
                event_ems_no,
                event_start_date,
                event_end_date,
                event_title,
                event_desc,
                event_mode,
                event_venue,
                event_capacity,
                event_status,
                event_reg_start_date,
                event_reg_end_date,
                event_reg_google_form,
                o.organiser_uuid,
                parent_uuid,
                organiser_name,
                stu_fire_id
            FROM ${DbTables.EVENT} e JOIN ${DbTables.ORGANISER} o 
            ON e.organiser_uuid=o.organiser_uuid`
			)
		res.json(events.recordset)
		connection.close()
	} catch (error) {
		next(error)
	}
}

export const getEventByIDController = async (
	req: Request<{ id: string }, EventWithOrganiser[], {}>,
	res: Response<EventWithOrganiser[]>,
	next: NextFunction
) => {
	try {
		const connection = await pool.connect()
		const organiser: mssql.IResult<EventWithOrganiser> = await connection
			.request()
			.input("event_uuid", mssql.UniqueIdentifier, req.params.id)
			.query(
				`SELECT 
                event_uuid,
                event_ems_no,
                event_start_date,
                event_end_date,
                event_title,
                event_desc,
                event_venue,
                event_capacity,
                event_status,
                event_reg_start_date,
                event_reg_end_date,
                event_reg_google_form,
                o.organiser_uuid,
                parent_uuid,
                organiser_name,
                stu_fire_id
            FROM ${DbTables.EVENT} e JOIN ${DbTables.ORGANISER} o 
            ON e.organiser_uuid=o.organiser_uuid
            WHERE [event_uuid] = @event_uuid`
			)
		res.json(organiser.recordset)
		connection.close()
	} catch (error) {
		next(error)
	}
}

export const deleteEventController = async (
	req: Request<{ id: string }, {}, {}>,
	res: Response<{}>,
	next: NextFunction
) => {
	try {
		const connection = await pool.connect()
		await connection
			.request()
			.input("event_uuid", mssql.UniqueIdentifier, req.params.id)
			.query(
				`DELETE FROM ${DbTables.EVENT} WHERE [event_uuid] = @event_uuid`
			)
		res.sendStatus(StatusCodes.NO_CONTENT)
		connection.close()
	} catch (error) {
		next(error)
	}
}

export const getEventParticipationController = async (
	req: Request<{ id: string }, ParticipationWithUUID[], {}>,
	res: Response<ParticipationWithUUID[]>,
	next: NextFunction
) => {
	try {
		const connection = await pool.connect()
		const participants: mssql.IResult<ParticipationWithUUID> =
			await connection
				.request()
				.input("event_uuid", mssql.UniqueIdentifier, req.params.id)
				.query(
					`SELECT * FROM ${DbTables.PARTICIPATION} WHERE event_uuid=@event_uuid`
				)
		res.send(participants.recordset)
		connection.close()
	} catch (error) {
		next(error)
	}
}
