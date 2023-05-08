import { Request, Response } from "express"
import mssql from "mssql"
import { pool } from "../utils/dfConfig"

export const getSchools = async (req: Request, res: Response) => {
	try {
		const connection = await pool.connect()
		const getSchoolsSQL = `SELECT [school_uuid], [school_name] 
			FROM [sems_demo].[dbo].[tbl_school]`
		const schools = await connection.query(getSchoolsSQL)
		connection.close()
		return res.status(200).json({ records: schools.recordset })
	} catch (error) {
		console.log(error)
	}
}

// * To access the /:id in the api, use req.params.id
export const getSchoolById = async (req: Request, res: Response) => {
	try {
		const schoolUUID = req.params.id
		const connection = await pool.connect()
		const getSchoolByIdSQL = `SELECT * FROM [sems_demo].[dbo].[tbl_school] 
			WHERE school_uuid=@school_uuid`
		const school = await connection
			.request()
			.input("school_uuid", mssql.UniqueIdentifier, schoolUUID)
			.query(getSchoolByIdSQL)
		connection.close()
		return res.status(200).send(school.recordset)
	} catch (error) {
		console.log(error)
	}
}

const updateSchool = async (
	school_uuid: any,
	schoolData: { school_name: any }
) => {
	try {
		const connection = await pool.connect()
		const updateSchoolSQL = `UPDATE [sems_demo].[dbo].[tbl_school] 
			SET [school_name] = @school_name
			WHERE [school_uuid] = @school_uuid
			
			SELECT [school_uuid]
					, [school_name]
			FROM [sems_demo].[dbo].[tbl_school]
			WHERE [school_uuid] = @school_uuid
			`
		const update = await connection
			.request()
			.input("school_uuid", mssql.UniqueIdentifier, school_uuid)
			.input("school_name", mssql.VarChar, schoolData.school_name)
			.query(updateSchoolSQL)
		connection.close()
		return update.recordset
	} catch (error) {
		console.log(error)
	}
}

export const updateSchoolController = async (req: Request, res: Response) => {
	try {
		const school_uuid = req.params.id
		const data = req.body
		const updated = await updateSchool(school_uuid, data)
		return res.send(updated)
	} catch (error) {
		res.status(400).send((error as Error).message)
	}
}

const deleteSchool = async (school_uuid: any) => {
	try {
		const connection = await pool.connect()
		const deleteSchoolSQL = `DELETE [sems_demo].[dbo].[tbl_school]
			WHERE [school_uuid] = @school_uuid`
		await connection
			.request()
			.input("school_uuid", mssql.UniqueIdentifier, school_uuid)
			.query(deleteSchoolSQL)
		connection.close()
	} catch (error) {
		console.log(error)
	}
}

export const deleteSchoolController = async (req: Request, res: Response) => {
	try {
		const school_uuid = req.params.id
		const deleted = await deleteSchool(school_uuid)
		return res.send(deleted)
	} catch (error) {
		res.status(400).send((error as Error).message)
	}
}
