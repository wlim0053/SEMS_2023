import { Request, Response } from "express"
import mssql from "mssql"
import { pool } from "../utils/dbConfig"
import { DbTables, StatusCodes } from "../utils/constant"

export const updateSchoolController = async (req: Request, res: Response) => {
	try {
		const connection = await pool.connect()
		const updated = await connection
			.request()
			.input("school_uuid", mssql.UniqueIdentifier, req.params.id)
			.input("school_name", mssql.VarChar, req.body.school_name)
			.query(
				`UPDATE ${DbTables.SCHOOL}
				SET [school_name] = @school_name
				OUTPUT INSERTED.*
				WHERE [school_uuid] = @school_uuid`
			)
		res.send({ data: updated.recordset })
		connection.close()
	} catch (error) {
		console.log(error)
	}
}

export const getSchoolController = async (req: Request, res: Response) => {
	try {
		const connection = await pool.connect()
		const schools = await connection.query(
			`SELECT * FROM ${DbTables.SCHOOL}`
		)
		connection.close()
		res.status(StatusCodes.OK).json({ data: schools.recordset }) // TODO 
	} catch (error) {
		console.log(error)
	}
}

export const getSchoolByIdController = async (req: Request, res: Response) => {
	try {
		const connection = await pool.connect()
		const school = await connection
			.request()
			.input("school_uuid", mssql.UniqueIdentifier, req.params.id)
			.query(
				`SELECT * FROM ${DbTables.SCHOOL} WHERE school_uuid=@school_uuid`
				)
		res.json({ data: school.recordset })
		connection.close()
	} catch (error) {
		console.log(error)
	}
}

export const deleteSchoolController = async (req: Request, res: Response) => {
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
		console.log(error)
	}
}