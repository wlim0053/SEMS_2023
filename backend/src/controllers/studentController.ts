import { NextFunction, Request, Response } from "express"
import mssql from "mssql"
import { pool } from "../utils/dbConfig"
import { DbTables, StatusCodes } from "../utils/constant"
import { SuccessResponse } from "../interfaces/response"
import { Student, StudentWithFireId } from "../interfaces/student"

export const createStudentController = async (
	req: Request<{}, SuccessResponse<StudentWithFireId>, StudentWithFireId>,
	res: Response<SuccessResponse<StudentWithFireId>>,
	next: NextFunction
) => {
	try {
		const connection = await pool.connect()
		const create: mssql.IResult<StudentWithFireId> = await connection
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
                INSERT INTO ${DbTables.STUDENT} 
                OUTPUT INSERTED.stu_fire_id, INSERTED.stu_email, INSERTED.stu_name, INSERTED.stu_id, INSERTED.enrolment_year, INSERTED.enrolment_intake, INSERTED.stu_gender, INSERTED.dis_uuid
                VALUES (
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
		res.json({ data: create.recordset })
		connection.close()
	} catch (error) {
		next(error)
	}
}

export const updateStudentController = async (
	req: Request<{ id: string }, SuccessResponse<StudentWithFireId>, Student>,
	res: Response<SuccessResponse<StudentWithFireId>>,
	next: NextFunction
) => {
	try {
		const connection = await pool.connect()
		const update: mssql.IResult<StudentWithFireId> = await connection
			.request()
			.input("stu_fire_id", mssql.VarChar, req.params.id)
			.input("stu_email", mssql.VarChar, req.body.stu_email)
			.input("stu_name", mssql.VarChar, req.body.stu_name)
			.input("stu_id", mssql.Int, req.body.stu_id)
			.input("enrolment_year", mssql.Date, req.body.enrolment_year)
			.input("enrolment_intake", mssql.Int, req.body.enrolment_intake)
			.input("stu_gender", mssql.Int, req.body.stu_gender)
			.input("dis_uuid", mssql.UniqueIdentifier, req.body.dis_uuid)
			.query(`
            UPDATE ${DbTables.STUDENT} SET
                [stu_email]=@stu_email,
                [stu_name]=@stu_name,
                [stu_id]=@stu_id,
                [enrolment_year]=@enrolment_year,
                [enrolment_intake]=@enrolment_intake,
                [stu_gender]=@stu_gender,
                [dis_uuid]=@dis_uuid
            OUTPUT INSERTED.*
            WHERE [stu_fire_id]=@stu_fire_id
        `)
		res.json({ data: update.recordset })
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
	req: Request<{}, SuccessResponse<StudentWithFireId>, {}>,
	res: Response<SuccessResponse<StudentWithFireId>>,
	next: NextFunction
) => {
	try {
		const connection = await pool.connect()
		const students = await connection.query(
			`SELECT * FROM ${DbTables.STUDENT}`
		)
		connection.close()
		res.status(StatusCodes.OK).json({ data: students.recordset })
	} catch (error) {
		next(error)
	}
}

export const getStudentByIdController = async (
	req: Request<{ id: string }, SuccessResponse<StudentWithFireId>, {}>,
	res: Response<SuccessResponse<StudentWithFireId>>,
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
		res.json({ data: student.recordset })
	} catch (error) {
		next(error)
	}
}
