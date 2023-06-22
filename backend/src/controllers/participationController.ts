import { NextFunction, Request, Response } from "express"
import mssql from "mssql"
import { pool } from "../utils/dbConfig"
import {
	Participation,
	ParticipationWithEvent,
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
			)
			.input(
				"participation_year",
				mssql.TinyInt,
				req.body.participation_year
			)
			.input(
				"participation_semester",
				mssql.TinyInt,
				req.body.participation_semester
			).query(`
                INSERT INTO ${DbTables.PARTICIPATION}
                OUTPUT INSERTED.*
                VALUES (
                    DEFAULT, 
                    @event_uuid, 
                    @user_fire_id, 
                    @participation_year, 
                    @participation_semester,
                    DEFAULT
                )
            `)
		res.json(create.recordset)
		connection.close()
	} catch (error) {
		next(error)
	}
}

export const markParticipationAttendanceController = async (
	req: Request<{ id: string }, ParticipationWithUUID[], Participation>,
	res: Response<ParticipationWithUUID[]>,
	next: NextFunction
) => {
	try {
		const connection = await pool.connect()
		const update: mssql.IResult<ParticipationWithUUID> = await connection
			.request()
			.input("participation_uuid", mssql.UniqueIdentifier, req.params.id)
			.input(
				"participation_attendance",
				mssql.Bit,
				req.body.participation_attendance
			).query(`
                UPDATE ${DbTables.PARTICIPATION} 
                SET [participation_attendance]=@participation_attendance
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
	req: Request<{}, ParticipationWithEvent[], {}, { event_status: string }>,
	res: Response<ParticipationWithEvent[]>,
	next: NextFunction
) => {
	let where = ""

	if (req.query.event_status) {
		where = `where e.event_status='${req.query.event_status}'`
	}

	try {
		const connection = await pool.connect()
		const participants: mssql.IResult<ParticipationWithEvent> =
			await connection.request().query(`
            SELECT 
                p.participation_uuid,
                p.user_fire_id,
                p.participation_year,
                p.participation_semester,
                p.participation_attendance,
                e.*
            FROM 
                ${DbTables.PARTICIPATION} p JOIN ${DbTables.EVENT} e
            ON 
                p.event_uuid=e.event_uuid
            ${where}
        `)
		res.json(participants.recordset)
		connection.close()
	} catch (error) {
		next(error)
	}
}

// ! might not be needed
// export const getParticipationByIdController = async (
// 	req: Request<{ id: string }, ParticipationWithUUID[], {}>,
// 	res: Response<ParticipationWithUUID[]>,
// 	next: NextFunction
// ) => {
// 	try {
// 		const connection = await pool.connect()
// 		const participant: mssql.IResult<ParticipationWithUUID> =
// 			await connection
// 				.request()
// 				.input(
// 					"participation_uuid",
// 					mssql.UniqueIdentifier,
// 					req.params.id
// 				).query(`
//             SELECT * FROM ${DbTables.PARTICIPATION}
//             WHERE participation_uuid=@participation_uuid
//         `)
// 		res.json(participant.recordset)
// 		connection.close()
// 	} catch (error) {
// 		next(error)
// 	}
// }

// export const deleteParticipationController = async (
// 	req: Request<{ id: string }, {}, {}>,
// 	res: Response<{}>,
// 	next: NextFunction
// ) => {
// 	try {
// 		const connection = await pool.connect()
// 		await connection
// 			.request()
// 			.input("participation_uuid", mssql.UniqueIdentifier, req.params.id)
// 			.query(`
//             DELETE FROM ${DbTables.PARTICIPATION} WHERE participation_uuid=@participation_uuid
//         `)
// 		res.sendStatus(StatusCodes.NO_CONTENT)
// 	} catch (error) {
// 		next(error)
// 	}
// }
