import { Request, Response } from "express"
import mssql from "mssql"
import { pool } from "../utils/dbConfig"
import { DbTables, StatusCodes } from "../utils/constant"

export const createParticipationController = async (
	req: Request,
	res: Response
) => {
	try {
		const connection = await pool.connect()
		const create = await connection
			.request()
			.input("event_uuid", mssql.UniqueIdentifier, req.body.event_uuid)
			.input("stu_fire_id", mssql.VarChar, req.body.stu_fire_id).query(`
                INSERT INTO ${DbTables.PARTICIPATION} (event_uuid, stu_fire_id) 
                OUTPUT INSERTED.*
                VALUES (@event_uuid, @stu_fire_id)
            `)
		res.send({ data: create.recordset })
		connection.close()
	} catch (error) {
		res.status(404).send(error)
	}
}

export const updateParticipationController = async (
	req: Request,
	res: Response
) => {
	try {
		const connection = await pool.connect()
		const update = await connection
			.request()
			.input("participation_uuid", mssql.UniqueIdentifier, req.params.id)
			.input("event_uuid", mssql.UniqueIdentifier, req.body.event_uuid)
			.input("stu_fire_id", mssql.VarChar, req.body.stu_fire_id).query(`
                UPDATE ${DbTables.PARTICIPATION} 
                SET [event_uuid]=@event_uuid,
                    [stu_fire_id]=@stu_fire_id
                OUTPUT INSERTED.*
                WHERE [participation_uuid]=@participation_uuid
            `)
		res.send({ data: update.recordset })
	} catch (error) {
		res.status(404).send(error)
	}
}

export const getParticipationController = async (
	req: Request,
	res: Response
) => {
	try {
		const connection = await pool.connect()
		const participants = await connection.request().query(`
            SELECT * FROM ${DbTables.PARTICIPATION} 
        `)
		res.send({ data: participants.recordset })
	} catch (error) {
		res.status(404).send(error)
	}
}

export const getParticipationByIdController = async (
	req: Request,
	res: Response
) => {
	try {
		const connection = await pool.connect()
		const participant = await connection
			.request()
			.input("participation_uuid", mssql.UniqueIdentifier, req.params.id)
			.query(`
            SELECT * FROM ${DbTables.PARTICIPATION}
            WHERE participation_uuid=@participation_uuid
        `)
		res.send({ data: participant.recordset })
	} catch (error) {
		res.status(404).send(error)
	}
}

export const deleteParticipationController = async (
	req: Request,
	res: Response
) => {
	try {
		const connection = await pool.connect()
		await connection
			.request()
			.input("participation_uuid", mssql.UniqueIdentifier, req.params.id)
			.query(`
            DELETE FROM ${DbTables.PARTICIPATION} WHERE participation_uuid=@participation_uuid
        `)
		res.sendStatus(StatusCodes.NO_CONTENT)
	} catch (error) {
		res.status(404).send(error)
	}
}
