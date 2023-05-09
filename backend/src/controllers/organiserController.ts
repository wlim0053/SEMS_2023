import { Request, Response } from "express"
import mssql from "mssql"
import { pool } from "../utils/dbConfig"
import { DbTables, StatusCodes } from "../utils/constant"

export const createOrganiserController = async (req: Request,res: Response) => {
	try {
		const connection = await pool.connect()
		const create = await connection
			.request()
			.input("parent_uuid", mssql.UniqueIdentifier, req.body.parent_uuid)
			.input("organiser_name", mssql.VarChar, req.body.organiser_name)
			.input("stu_fire_id", mssql.VarChar, req.body.stu_fire_id)
			.query(`
                INSERT INTO ${DbTables.ORGANISER}  
				OUTPUT INSERTED.*
				VALUES (
                    DEFAULT,
                    @parent_uuid,
                    @organiser_name,
                    @stu_fire_id
                )`)
		res.send({ data: create.recordset })
		connection.close()
	} catch (error) {
		console.log(error)
	}
}

export const updateOrganiserController = async (req: Request, res: Response) => {
	try {
		const connection = await pool.connect()
		const updated = await connection
			.request()
			.input("organiser_uuid", mssql.UniqueIdentifier,req.params.id)
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
			`)
		res.send({ data: updated.recordset })
		connection.close()
	} catch (error) {
		console.log(error)
	}
}

export const getOrganiserController = async (req: Request, res: Response) => {
	try {
		const connection = await pool.connect()
		const organisers = await connection.query(
			`SELECT * FROM ${DbTables.ORGANISER}`
		)
		res.status(StatusCodes.OK).json({ data: organisers.recordset }) // TODO 
		connection.close()
	} catch (error) {
		console.log(error)
	}
}

export const getOrganiserByIDController = async (req: Request, res: Response) => {
	try {
		const connection = await pool.connect()
		const organiser = await connection
			.request()
			.input("organiser_uuid", mssql.VarChar, req.params.id)
			.query(
				`SELECT * FROM ${DbTables.ORGANISER} WHERE organiser_uuid = @organiser_uuid`
			)
		res.json({ data: organiser.recordset })
		connection.close()
	} catch (error) {
		console.log(error)
	}
}

export const deleteOrganiserController = async (req: Request, res: Response) => {
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
		console.log(error)
	}
}