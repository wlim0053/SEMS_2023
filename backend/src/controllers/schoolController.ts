import { Request, Response } from "express"
import mssql from "mssql"
import { createSchool, updateSchool, deleteSchool } from "../utils/seed"
import { pool } from "../utils/dfConfig"

// ! Remember to close connection after query

export const getSchools = async (req: Request, res: Response) => {
	try {
		const connection = await pool.connect()
		const schools = await connection.query(
			"SELECT [school_uuid], [school_name] FROM [sems_demo].[dbo].[tbl_school]"
		)
		return res.status(200).send(schools.recordset)
	} catch (error) {
		console.log(error)
	}
}

// * To access the /:id in the api, use req.params.id
export const getSchoolById = async (req: Request, res: Response) => {
	const schoolUUID = req.params.id
	try {
		const connection = await pool.connect()
		const school = await connection
			.request()
			.input("school_uuid", mssql.UniqueIdentifier, schoolUUID)
			.query(
				"SELECT * FROM [sems_demo].[dbo].[tbl_school] WHERE school_uuid=@school_uuid"
			)
		connection.close()
		return res.status(200).send(school.recordset)
	} catch (error) {
		console.log(error)
	}
}

export const createSchoolController = async (req: Request, res: Response) => {
	try {
		const data = req.body
		// const created = await createSchool(data)
		// res.send(created)
	} catch (error) {
		res.status(400).send((error as Error).message)
	}
}

export const updateSchoolController = async (req: Request, res: Response) => {
	try {
		const school_uuid = req.params.id
		const data = req.body
		const updated = await updateSchool(school_uuid, data)
		res.send(updated)
	} catch (error) {
		res.status(400).send((error as Error).message)
	}
}

export const deleteSchoolController = async (req: Request, res: Response) => {
	try {
		const school_uuid = req.params.id
		const deleted = await deleteSchool(school_uuid)
		res.send(deleted)
	} catch (error) {
		res.status(400).send((error as Error).message)
	}
}
