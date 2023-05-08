import { Request, Response } from "express"
import mssql, { VarChar } from "mssql"
import { pool } from "../utils/dbConfig"
import { StatusCodes } from "../utils/statusCodes"

export const getStudents = async (req: Request, res: Response) => {
	try {
		const connection = await pool.connect()
		const students = await connection.query(
			"SELECT * FROM [sems_demo].[dbo].[tbl_student]"
		)
		connection.close()
		res.status(StatusCodes.OK).json({ records: students.recordset })
	} catch (error) {
		console.log(error)
		res.send(StatusCodes.NOT_FOUND)
	}
}

export const postStudent = async (req: Request, res: Response) => {
	try {
		const connection = await pool.connect()
		const create = await connection
			.request()
			.input("stu_fire_id", mssql.VarChar, req.body.stu_fire_id)
			.input("stu_email", mssql.VarChar, req.body.stu_email)
			.input("stu_name", mssql.VarChar, req.body.stu_name)
			.input("stu_id", mssql.Int, req.body.stu_id)
			.input("enrolment_year", mssql.Date, req.body.enrolment_year)
			.input("enrolment_intake", mssql.Int, req.body.enrolment_intake)
			.input("stu_gender", mssql.Int, req.body.stu_gender)
			.input("dis_uuid", mssql.UniqueIdentifier, req.body.dis_uuid)
			.query(`
                INSERT INTO [sems_demo].[dbo].[tbl_student] VALUES (
                    @stu_fire_id,
                    @stu_email,
                    @stu_name,
                    @stu_id,
                    @enrolment_year,
                    @enrolment_intake,
                    @stu_gender,
                    @dis_uuid
                )
            `)
		res.send(create)
	} catch (error) {
		res.status(404).send(error)
	}
}

export const getStudentByID = async (req: Request, res: Response) => {
	try {
		const connection = await pool.connect()
		const student = await connection
			.request()
			.input("stu_fire_id", mssql.VarChar, req.params.id)
			.query(
				"SELECT * FROM [sems_demo].[dbo].[tbl_student] WHERE stu_fire_id=@stu_fire_id"
			)
		res.send(student.recordset)
	} catch (error) {
		res.status(404).send(error)
	}
}
