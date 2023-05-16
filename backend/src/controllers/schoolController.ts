import { NextFunction, Request, Response } from "express"
import mssql from "mssql"
import { pool } from "../utils/dbConfig"
import { DbTables, StatusCodes } from "../utils/constant"
import { School, SchoolWithUUID } from "../interfaces/school"

export const updateSchoolController = async (
	req: Request<{ id: string }, SchoolWithUUID[], School>,
	res: Response<SchoolWithUUID[]>,
	next: NextFunction
) => {
	try {
		const connection = await pool.connect()
		const updated: mssql.IResult<SchoolWithUUID> = await connection
			.request()
			.input("school_uuid", mssql.UniqueIdentifier, req.params.id)
			.input("school_name", mssql.VarChar, req.body.school_name)
			.query(
				`UPDATE ${DbTables.SCHOOL}
				SET [school_name] = @school_name
				OUTPUT INSERTED.*
				WHERE [school_uuid] = @school_uuid`
			)
		res.json(updated.recordset)
		connection.close()
	} catch (error) {
		next(error)
	}
}

export const getSchoolController = async (
	req: Request<{}, SchoolWithUUID[], {}>,
	res: Response<SchoolWithUUID[]>,
	next: NextFunction
) => {
	try {
		const connection = await pool.connect()
		const schools: mssql.IResult<SchoolWithUUID> = await connection.query(
			`SELECT * FROM ${DbTables.SCHOOL}`
		)
		res.status(StatusCodes.OK).json(schools.recordset)
		connection.close()
	} catch (error) {
		next(error)
	}
}

export const getSchoolByIdController = async (
	req: Request<{ id: string }, SchoolWithUUID[], School>,
	res: Response<SchoolWithUUID[]>,
	next: NextFunction
) => {
	try {
		const connection = await pool.connect()
		const school: mssql.IResult<SchoolWithUUID> = await connection
			.request()
			.input("school_uuid", mssql.UniqueIdentifier, req.params.id)
			.query(
				`SELECT * FROM ${DbTables.SCHOOL} WHERE school_uuid=@school_uuid`
			)
		res.status(StatusCodes.OK).json(school.recordset)
		connection.close()
	} catch (error) {
		next(error)
	}
}

export const deleteSchoolController = async (
	req: Request<{ id: string }, {}, {}>,
	res: Response<{}>,
	next: NextFunction
) => {
	try {
		const connection = await pool.connect()
		await connection
			.request()
			.input("school_uuid", mssql.UniqueIdentifier, req.params.id)
			.query(
				`DELETE ${DbTables.SCHOOL} WHERE [school_uuid] = @school_uuid`
			)
		res.sendStatus(StatusCodes.NO_CONTENT)
		connection.close()
	} catch (error) {
		next(error)
	}
}
