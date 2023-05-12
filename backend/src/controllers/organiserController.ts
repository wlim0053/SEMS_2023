import { NextFunction, Request, Response } from "express"
import mssql from "mssql"
import { pool } from "../utils/dbConfig"
import { DbTables, StatusCodes } from "../utils/constant"
import { SuccessResponse } from "../interfaces/response"
import { Organiser, OrganiserWithUUID } from "../interfaces/organiser"

export const createOrganiserController = async (
	req: Request<{}, SuccessResponse<OrganiserWithUUID>, Organiser>,
	res: Response<SuccessResponse<OrganiserWithUUID>>,
	next: NextFunction
) => {
	try {
		const connection = await pool.connect()
		const create: mssql.IResult<OrganiserWithUUID> = await connection
			.request()
			.input("parent_uuid", mssql.UniqueIdentifier, req.body.parent_uuid)
			.input("organiser_name", mssql.VarChar, req.body.organiser_name)
			.input("stu_fire_id", mssql.VarChar, req.body.stu_fire_id).query(`
                INSERT INTO ${DbTables.ORGANISER}  
				OUTPUT INSERTED.*
				VALUES (
                    DEFAULT,
                    @parent_uuid,
                    @organiser_name,
                    @stu_fire_id
                )`)
		res.json({ data: create.recordset })
		connection.close()
	} catch (error) {
		next(error)
	}
}

export const updateOrganiserController = async (
	req: Request<{ id: string }, SuccessResponse<OrganiserWithUUID>, Organiser>,
	res: Response<SuccessResponse<OrganiserWithUUID>>,
	next: NextFunction
) => {
	try {
		const connection = await pool.connect()
		const updated: mssql.IResult<OrganiserWithUUID> = await connection
			.request()
			.input("organiser_uuid", mssql.UniqueIdentifier, req.params.id)
			.input("parent_uuid", mssql.UniqueIdentifier, req.body.parent_uuid)
			.input("organiser_name", mssql.VarChar, req.body.organiser_name)
			.input("stu_fire_id", mssql.VarChar, req.body.stu_fire_id)
			.query(
				`UPDATE ${DbTables.ORGANISER} 
			        SET [parent_uuid] = @parent_uuid, 
                        [organiser_name] = @organiser_name,
                        [stu_fire_id] = @stu_fire_id
				OUTPUT INSERTED.*
			    WHERE [organiser_uuid] = @organiser_uuid
			`
			)
		res.json({ data: updated.recordset })
		connection.close()
	} catch (error) {
		next(error)
	}
}

export const getOrganiserController = async (
	req: Request<{}, SuccessResponse<OrganiserWithUUID>, {}>,
	res: Response<SuccessResponse<OrganiserWithUUID>>,
	next: NextFunction
) => {
	try {
		const connection = await pool.connect()
		const organisers: mssql.IResult<OrganiserWithUUID> =
			await connection.query(`SELECT * FROM ${DbTables.ORGANISER}`)
		res.status(StatusCodes.OK).json({ data: organisers.recordset })
		connection.close()
	} catch (error) {
		next(error)
	}
}

export const getOrganiserByIDController = async (
	req: Request<{ id: string }, SuccessResponse<OrganiserWithUUID>, {}>,
	res: Response<SuccessResponse<OrganiserWithUUID>>,
	next: NextFunction
) => {
	try {
		const connection = await pool.connect()
		const organiser: mssql.IResult<OrganiserWithUUID> = await connection
			.request()
			.input("organiser_uuid", mssql.VarChar, req.params.id)
			.query(
				`SELECT * FROM ${DbTables.ORGANISER} WHERE organiser_uuid = @organiser_uuid`
			)
		res.json({ data: organiser.recordset })
		connection.close()
	} catch (error) {
		next(error)
	}
}

export const deleteOrganiserController = async (
	req: Request<{ id: string }, {}, {}>,
	res: Response<{}>,
	next: NextFunction
) => {
	try {
		const connection = await pool.connect()
		await connection
			.request()
			.input("organiser_uuid", mssql.UniqueIdentifier, req.params.id)
			.query(
				`DELETE FROM ${DbTables.ORGANISER} WHERE [organiser_uuid] = @organiser_uuid`
			)
		res.sendStatus(StatusCodes.NO_CONTENT)
		connection.close()
	} catch (error) {
		next(error)
	}
}
