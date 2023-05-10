import { Request, Response } from "express"
import mssql from "mssql"
import { pool } from "../utils/dbConfig"
import { DbTables, StatusCodes } from "../utils/constant"

export const createEventController = async (req: Request, res: Response) => {
	try {
		const connection = await pool.connect()
		const create = await connection
			.request()
			.input("event_uuid", mssql.UniqueIdentifier, req.body.event_uuid)
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
			.input("event_id", mssql.VarChar, req.body.event_id)
			.input("event_title", mssql.VarChar, req.body.event_title)
			.input("event_desc", mssql.VarChar, req.body.event_desc)
			.input("event_venue", mssql.VarChar, req.body.event_venue)
			.input("event_capacity", mssql.Int, req.body.event_capacity)
			.input("event_status", mssql.VarChar, req.body.event_status).query(`
                INSERT INTO ${DbTables.EVENT}  
				OUTPUT INSERTED.*
				VALUES (
                    DEFAULT,
                    @event_ems_no,
                    @organiser_uuid,
                    @event_start_date,
                    @event_end_date,
                    @event_id,
                    @event_title,
                    @event_desc,
                    @event_venue,
                    @event_capacity,
                    DEFAULT
                )`)
		res.send({ data: create.recordset })
		connection.close()
	} catch (error) {
		console.log(error)
	}
}

export const updateOrganiserController = async (
	req: Request,
	res: Response
) => {
	try {
		const connection = await pool.connect()
		const updated = await connection
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
			.input("event_id", mssql.VarChar, req.body.event_id)
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
                        [event_id] = @event_id, 
                        [event_title] = @event_title,
                        [event_desc] = @event_desc, 
                        [event_venue] = @event_venue,
                        [event_capacity] = @event_capacity, 
                        [event_status] = @event_status
				OUTPUT INSERTED.*
			    WHERE [event_uuid] = @event_uuid
			`
			)
		res.send({ data: updated.recordset })
		connection.close()
	} catch (error) {
		console.log(error)
	}
}

export const getEventController = async (req: Request, res: Response) => {
	try {
		const connection = await pool.connect()
		const events = await connection.query(`SELECT * FROM ${DbTables.EVENT}`)
		res.status(StatusCodes.OK).json({ data: events.recordset }) // TODO
		connection.close()
	} catch (error) {
		console.log(error)
	}
}

export const getEventByIDController = async (req: Request, res: Response) => {
	try {
		const connection = await pool.connect()
		const organiser = await connection
			.request()
			.input("event_uuid", mssql.UniqueIdentifier, req.params.id)
			.query(
				`SELECT * FROM ${DbTables.EVENT} WHERE [event_uuid] = @event_uuid`
			)
		res.json({ data: organiser.recordset })
		connection.close()
	} catch (error) {
		console.log(error)
	}
}

export const deleteEventController = async (req: Request, res: Response) => {
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
		console.log(error)
	}
}

export const getEventParticipationController = async (
	req: Request,
	res: Response
) => {
	try {
		const connection = await pool.connect()
		const participants = await connection
			.request()
			.input("event_uuid", mssql.UniqueIdentifier, req.params.id)
			.query(
				`SELECT * FROM ${DbTables.PARTICIPATION} WHERE event_uuid=@event_uuid`
			)
		res.send({ data: participants.recordset })
		connection.close()
	} catch (error) {
		res.status(404).send(error)
	}
}
