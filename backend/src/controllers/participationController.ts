import { NextFunction, Request, Response } from "express"
import mssql from "mssql"
import { pool } from "../utils/dbConfig"
import {
	Participation,
	ParticipationWithUUID,
} from "../interfaces/participation"
import { DbTables, StatusCodes } from "../utils/constant"

export const createParticipationController = async (
	req: Request<{}, ParticipationWithUUID[], Participation>,
	res: Response<ParticipationWithUUID[]>,
	next: NextFunction
) => {
	try {
		const connection = await pool.connect()
		const create: mssql.IResult<ParticipationWithUUID> = await connection
			.request()
			.input("event_uuid", mssql.UniqueIdentifier, req.body.event_uuid)
			.input("user_fire_id", mssql.VarChar, req.body.user_fire_id)
			.input(
				"participation_attendance",
				mssql.Bit,
				req.body.participation_attendance
			).query(`
                INSERT INTO ${DbTables.PARTICIPATION}
                OUTPUT INSERTED.*
                VALUES (DEFAULT, @event_uuid, @user_fire_id, @participation_attendance)
            `)
		res.json(create.recordset)
		connection.close()
	} catch (error) {
		next(error)
	}
}

export const updateParticipationController = async (
	req: Request<{ id: string }, ParticipationWithUUID[], Participation>,
	res: Response<ParticipationWithUUID[]>,
	next: NextFunction
) => {
	try {
		const connection = await pool.connect()
		const update: mssql.IResult<ParticipationWithUUID> = await connection
			.request()
			.input("participation_uuid", mssql.UniqueIdentifier, req.params.id)
			.input("event_uuid", mssql.UniqueIdentifier, req.body.event_uuid)
			.input("user_fire_id", mssql.VarChar, req.body.user_fire_id).query(`
                UPDATE ${DbTables.PARTICIPATION} 
                SET [event_uuid]=@event_uuid,
                    [user_fire_id]=@user_fire_id,
                    [participation_attendance]=@participation_attendance
                OUTPUT INSERTED.*
                WHERE [participation_uuid]=@participation_uuid
            `)
		res.json(update.recordset)
		connection.close()
	} catch (error) {
		next(error)
	}
}

export const getParticipationController = async (
	req: Request<{}, ParticipationWithUUID[], {}>,
	res: Response<ParticipationWithUUID[]>,
	next: NextFunction
) => {
	try {
		const connection = await pool.connect()
		const participants: mssql.IResult<ParticipationWithUUID> =
			await connection.request().query(`
            SELECT * FROM ${DbTables.PARTICIPATION} 
        `)
		res.json(participants.recordset)
		connection.close()
	} catch (error) {
		next(error)
	}
}

export const getParticipationByIdController = async (
	req: Request<{ id: string }, ParticipationWithUUID[], {}>,
	res: Response<ParticipationWithUUID[]>,
	next: NextFunction
) => {
	try {
		const connection = await pool.connect()
		const participant: mssql.IResult<ParticipationWithUUID> =
			await connection
				.request()
				.input(
					"participation_uuid",
					mssql.UniqueIdentifier,
					req.params.id
				).query(`
            SELECT * FROM ${DbTables.PARTICIPATION}
            WHERE participation_uuid=@participation_uuid
        `)
		res.json(participant.recordset)
		connection.close()
	} catch (error) {
		next(error)
	}
}

export const deleteParticipationController = async (
	req: Request<{ id: string }, {}, {}>,
	res: Response<{}>,
	next: NextFunction
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
		next(error)
	}
}
