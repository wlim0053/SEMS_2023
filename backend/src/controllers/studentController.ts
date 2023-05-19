import { NextFunction, Request, Response } from "express"
import mssql from "mssql"
import { pool } from "../utils/dbConfig"
import { DbTables, StatusCodes } from "../utils/constant"
import { Student, StudentWithFireId } from "../interfaces/student"

export const createStudentController = async (
	req: Request<{}, StudentWithFireId[], StudentWithFireId>,
	res: Response<StudentWithFireId[]>,
	next: NextFunction
) => {
	try {
		const connection = await pool.connect()
		const create: mssql.IResult<StudentWithFireId> = await connection
			.request()
			.input("stu_fire_id", mssql.VarChar, req.body.stu_fire_id)
			.input("spec_uuid", mssql.UniqueIdentifier, req.body.spec_uuid)
			.input("stu_email", mssql.VarChar, req.body.stu_email)
			.input("stu_name", mssql.VarChar, req.body.stu_name)
			.input("stu_id", mssql.Int, req.body.stu_id)
			.input("stu_gender", mssql.Int, req.body.stu_gender)
			.input("enrolment_year", mssql.Date, req.body.enrolment_year)
			.input("enrolment_intake", mssql.Int, req.body.enrolment_intake)
			.query(`
                INSERT INTO ${DbTables.STUDENT} 
                OUTPUT INSERTED.*
                VALUES (
                    @stu_fire_id,
                    @spec_uuid,
                    @stu_email,
                    @stu_name,
                    @stu_id,
                    @stu_gender,
                    @enrolment_year,
                    @enrolment_intake
                )
            `)
		res.json(create.recordset)
		connection.close()
	} catch (error) {
		next(error)
	}
}

export const updateStudentController = async (
	req: Request<{ id: string }, StudentWithFireId[], Student>,
	res: Response<StudentWithFireId[]>,
	next: NextFunction
) => {
	try {
		const connection = await pool.connect()
		const update: mssql.IResult<StudentWithFireId> = await connection
			.request()
			.input("stu_fire_id", mssql.VarChar, req.params.id)
			.input("spec_uuid", mssql.UniqueIdentifier, req.body.spec_uuid)
			.input("stu_email", mssql.VarChar, req.body.stu_email)
			.input("stu_name", mssql.VarChar, req.body.stu_name)
			.input("stu_id", mssql.Int, req.body.stu_id)
			.input("stu_gender", mssql.Int, req.body.stu_gender)
			.input("enrolment_year", mssql.Date, req.body.enrolment_year)
			.input("enrolment_intake", mssql.Int, req.body.enrolment_intake)
			.query(`
            UPDATE ${DbTables.STUDENT} SET
                [stu_email]=@stu_email,
                [spec_uuid]=@spec_uuid,
                [stu_name]=@stu_name,
                [stu_id]=@stu_id,
                [stu_gender]=@stu_gender,
                [enrolment_year]=@enrolment_year,
                [enrolment_intake]=@enrolment_intake
            OUTPUT INSERTED.*
            WHERE [stu_fire_id]=@stu_fire_id
        `)
		res.json(update.recordset)
		connection.close()
	} catch (error) {
		next(error)
	}
}

export const deleteStudentController = async (
	req: Request<{ id: string }, {}, {}>,
	res: Response<{}>,
	next: NextFunction
) => {
	try {
		const connection = await pool.connect()
		await connection
			.request()
			.input("stu_fire_id", mssql.VarChar, req.params.id)
			.query(
				`DELETE FROM ${DbTables.STUDENT} WHERE [stu_fire_id]=@stu_fire_id`
			)
		res.sendStatus(204)
		connection.close()
	} catch (error) {
		next(error)
	}
}

export const getStudentController = async (
	req: Request<{}, StudentWithFireId[], {}>,
	res: Response<StudentWithFireId[]>,
	next: NextFunction
) => {
	try {
		const connection = await pool.connect()
		const students: mssql.IResult<StudentWithFireId> =
			await connection.query(`SELECT * FROM ${DbTables.STUDENT}`)
		connection.close()
		res.status(StatusCodes.OK).json(students.recordset)
	} catch (error) {
		next(error)
	}
}

export const getStudentByIdController = async (
	req: Request<{ id: string }, StudentWithFireId[], {}>,
	res: Response<StudentWithFireId[]>,
	next: NextFunction
) => {
	try {
		const connection = await pool.connect()
		const student: mssql.IResult<StudentWithFireId> = await connection
			.request()
			.input("stu_fire_id", mssql.VarChar, req.params.id)
			.query(
				`SELECT * FROM ${DbTables.STUDENT} WHERE stu_fire_id=@stu_fire_id`
			)
		res.json(student.recordset)
	} catch (error) {
		next(error)
	}
}
