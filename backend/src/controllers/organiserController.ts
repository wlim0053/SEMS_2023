import { Request, Response } from "express"
import mssql from "mssql"
import { pool } from "../utils/dbConfig"
import { StatusCodes } from "../utils/constant"

export const createOrganiserController = async (
	req: Request,
	res: Response
) => {
	try {
		const connection = await pool.connect()
		const create = await connection
			.request()
			.input(
				"organiser_uuid",
				mssql.UniqueIdentifier,
				req.body.organiser_uuid
			)
			.input("parent_uuid", mssql.UniqueIdentifier, req.body.parent_uuid)
			.input("organiser_name", mssql.VarChar, req.body.organiser_name)
			.input("stu_fire_id", mssql.VarChar, req.body.stu_fire_id).query(`
                INSERT INTO [sems_demo].[dbo].[tbl_organiser] VALUES (
                    @organiser_uuid,
                    @parent_uuid,
                    @organiser_name,
                    @stu_fire_id
                )
            `)
		res.send(create)
	} catch (error) {
		res.status(StatusCodes.BAD_REQUEST).send(error)
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
			.input(
				"organiser_uuid",
				mssql.UniqueIdentifier,
				req.body.organiser_uuid
			)
			.input("parent_uuid", mssql.UniqueIdentifier, req.body.parent_uuid)
			.input("organiser_name", mssql.VarChar, req.body.organiser_name)
			.input("stu_fire_id", mssql.VarChar, req.body.stu_fire_id)
			.query(
				`UPDATE [sems_demo].[dbo].[tbl_organiser] 
			        SET [parent_uuid] = @parent_uuid, 
                        [organiser_name] = @organiser_name,
                        [stu_fire_id] = @stu_fire_id
			    WHERE [organiser_uuid] = @organiser_uuid
			    
                SELECT * FROM [sems_demo].[dbo].[tbl_organiser]
			    WHERE [organiser_uuid] = @organiser_uuid
			`
			)
		return res.send(updated)
	} catch (error) {
		res.status(StatusCodes.BAD_REQUEST).send(error)
	}
}

export const deleteOrganiserController = async (
	req: Request,
	res: Response
) => {
	try {
		const connection = await pool.connect()
		const deleted = await connection
			.request()
			.input(
				"organiser_uuid",
				mssql.UniqueIdentifier,
				req.body.organiser_uuid
			)
			.query(
				`DELETE [sems_demo].[dbo].[tbl_organiser]
			WHERE [organiser_uuid] = @organiser_uuid`
			)
		connection.close()
		return res.send(deleted)
	} catch (error) {
		res.status(StatusCodes.BAD_REQUEST).send(error)
	}
}

export const getOrganisersController = async (req: Request, res: Response) => {
	try {
		const connection = await pool.connect()
		const organisers = await connection.query(
			`SELECT * FROM [sems_demo].[dbo].[tbl_organiser]`
		)
		connection.close()
		return res
			.status(StatusCodes.OK)
			.json({ records: organisers.recordset })
	} catch (error) {
		res.status(StatusCodes.BAD_REQUEST).send(error)
	}
}

export const getOrganiserByIDController = async (
	req: Request,
	res: Response
) => {
	try {
		const connection = await pool.connect()
		const organiser = await connection
			.request()
			.input("organiser_uuid", mssql.VarChar, req.params.organiser_uuid)
			.query(
				"SELECT * FROM [sems_demo].[dbo].[tbl_organiser] WHERE organiser_uuid = @organiser_uuid"
			)
		connection.close()
		return res.status(StatusCodes.OK).send(organiser.recordset)
	} catch (error) {
		res.status(404).send(error)
	}
}
