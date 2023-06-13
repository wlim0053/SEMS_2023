import { NextFunction, Request, Response } from "express"
import mssql from "mssql"
import { pool } from "../utils/dbConfig"
import { DbTables, StatusCodes } from "../utils/constant"
import { User, UserWithFireId } from "../interfaces/user"

export const createUserController = async (
	req: Request<{}, UserWithFireId[], UserWithFireId>,
	res: Response<UserWithFireId[]>,
	next: NextFunction
) => {
	try {
		const connection = await pool.connect()
		const create: mssql.IResult<UserWithFireId> = await connection
			.request()
			.input("user_fire_id", mssql.VarChar, req.body.user_fire_id)
			.input("spec_uuid", mssql.UniqueIdentifier, req.body.spec_uuid)
			.input("user_email", mssql.VarChar, req.body.user_email)
			.input("user_fname", mssql.VarChar, req.body.user_fname)
			.input("user_lname", mssql.VarChar, req.body.user_lname)
			.input("user_id", mssql.Int, req.body.user_id)
			.input("user_gender", mssql.Int, req.body.user_gender)
			.input(
				"user_access_lvl",
				mssql.Char,
				req.body.user_access_lvl ?? null
			)
			.input("enrolment_year", mssql.Date, req.body.enrolment_year)
			.input("enrolment_intake", mssql.Int, req.body.enrolment_intake)
			.query(`
                INSERT INTO ${DbTables.USER} 
                OUTPUT INSERTED.*
                VALUES (
                    @user_fire_id,
                    @spec_uuid,
                    @user_email,
                    @user_fname,
                    @user_lname,
                    @user_id,
                    @user_gender,
                    @user_access_lvl,
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

export const updateUserController = async (
	req: Request<{ id: string }, UserWithFireId[], User>,
	res: Response<UserWithFireId[]>,
	next: NextFunction
) => {
	try {
		const connection = await pool.connect()
		const update: mssql.IResult<UserWithFireId> = await connection
			.request()
			.input("user_fire_id", mssql.VarChar, req.params.id)
			.input("spec_uuid", mssql.UniqueIdentifier, req.body.spec_uuid)
			.input("user_email", mssql.VarChar, req.body.user_email)
			.input("user_fname", mssql.VarChar, req.body.user_fname)
			.input("user_lname", mssql.VarChar, req.body.user_lname)
			.input("user_id", mssql.Int, req.body.user_id)
			.input("user_gender", mssql.Int, req.body.user_gender)
			.input("user_access_lvl", mssql.Char, req.body.user_access_lvl)
			.input("enrolment_year", mssql.Date, req.body.enrolment_year)
			.input("enrolment_intake", mssql.Int, req.body.enrolment_intake)
			.query(`
            UPDATE ${DbTables.USER} SET
                [user_email]=@user_email,
                [spec_uuid]=@spec_uuid,
                [user_fname]=@user_fname,
                [user_lname]=@user_lname,
                [user_id]=@user_id,
                [user_gender]=@user_gender,
                [user_access_lvl]=@user_access_lvl,
                [enrolment_year]=@enrolment_year,
                [enrolment_intake]=@enrolment_intake
            OUTPUT INSERTED.*
            WHERE [user_fire_id]=@user_fire_id
        `)
		res.json(update.recordset)
		connection.close()
	} catch (error) {
		next(error)
	}
}

export const deleteUserController = async (
	req: Request<{ id: string }, {}, {}>,
	res: Response<{}>,
	next: NextFunction
) => {
	try {
		const connection = await pool.connect()
		await connection
			.request()
			.input("user_fire_id", mssql.VarChar, req.params.id)
			.query(
				`DELETE FROM ${DbTables.USER} WHERE [user_fire_id]=@user_fire_id`
			)
		res.sendStatus(204)
		connection.close()
	} catch (error) {
		next(error)
	}
}

export const getUserController = async (
	req: Request<{}, UserWithFireId[], {}>,
	res: Response<UserWithFireId[]>,
	next: NextFunction
) => {
	try {
		const connection = await pool.connect()
		const Users: mssql.IResult<UserWithFireId> = await connection.query(
			`SELECT * FROM ${DbTables.USER}`
		)
		connection.close()
		res.status(StatusCodes.OK).json(Users.recordset)
	} catch (error) {
		next(error)
	}
}

export const getUserByIdController = async (
	req: Request<{ id: string }, UserWithFireId[], {}>,
	res: Response<UserWithFireId[]>,
	next: NextFunction
) => {
	try {
		const connection = await pool.connect()
		const student: mssql.IResult<UserWithFireId> = await connection
			.request()
			.input("user_fire_id", mssql.VarChar, req.params.id)
			.query(
				`SELECT * FROM ${DbTables.USER} WHERE user_fire_id=@user_fire_id`
			)
		res.json(student.recordset)
	} catch (error) {
		next(error)
	}
}
