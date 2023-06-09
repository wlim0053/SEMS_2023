import { NextFunction, Request, Response } from "express"
import mssql from "mssql"
import { pool } from "../utils/dbConfig"
import { DbTables, StatusCodes } from "../utils/constant"
import { User, UserLogin, UserWithFireId } from "../interfaces/user"
import { EventWithOrganiser } from "../interfaces/event"
import { generateJwtHandler } from "../middlewares/jwtHandler"

export const registerUserController = async (
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
			.input(
				"user_enrolment_year",
				mssql.Int,
				req.body.user_enrolment_year
			)
			.input(
				"user_enrolment_semester",
				mssql.TinyInt,
				req.body.user_enrolment_semester
			)
			.input("user_gender", mssql.Int, req.body.user_gender).query(`
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
                    @user_enrolment_year,
                    @user_enrolment_semester,
                    DEFAULT
                )
            `)
		if (create.recordset.length != 0) {
			const generatedToken = generateJwtHandler(create.recordset[0])
			res.cookie("token", generatedToken, {
				secure: true,
				sameSite: "none",
				httpOnly: true,
			})
		}
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
			.input(
				"user_enrolment_year",
				mssql.Int,
				req.body.user_enrolment_year
			)
			.input(
				"user_enrolment_semester",
				mssql.TinyInt,
				req.body.user_enrolment_semester
			).query(`
            UPDATE ${DbTables.USER} SET
                [user_email]=@user_email,
                [spec_uuid]=@spec_uuid,
                [user_fname]=@user_fname,
                [user_lname]=@user_lname,
                [user_id]=@user_id,
                [user_gender]=@user_gender,
                [user_enrolment_year]=@user_enrolment_year,
                [user_enrolment_semester]=@user_enrolment_semester
            OUTPUT INSERTED.*
            WHERE [user_fire_id]=@user_fire_id
        `)
		res.json(update.recordset)
		connection.close()
	} catch (error) {
		next(error)
	}
}

export const loginUserController = async (
	req: Request<{}, UserWithFireId[], UserLogin, {}>,
	res: Response<UserWithFireId[]>,
	next: NextFunction
) => {
	try {
		const connection = await pool.connect()
		const student: mssql.IResult<UserWithFireId> = await connection
			.request()
			.input("user_fire_id", mssql.VarChar, req.body.user_fire_id)
			.query(
				`SELECT * FROM ${DbTables.USER} WHERE user_fire_id=@user_fire_id`
			)

		if (student.recordset.length !== 0) {
			const generatedToken = generateJwtHandler(student.recordset[0])
			res.cookie("token", generatedToken, {
				secure: true,
				sameSite: "none",
				httpOnly: true,
			})
			res.json(student.recordset)
			connection.close()
		} else {
			res.status(401)
			throw new Error("Unauthorised")
		}
	} catch (error) {
		next(error)
	}
}
// ! might not be needed anymore
// export const deleteUserController = async (
// 	req: Request<{ id: string }, {}, {}>,
// 	res: Response<{}>,
// 	next: NextFunction
// ) => {
// 	try {
// 		const connection = await pool.connect()
// 		await connection
// 			.request()
// 			.input("user_fire_id", mssql.VarChar, req.params.id)
// 			.query(
// 				`DELETE FROM ${DbTables.USER} WHERE [user_fire_id]=@user_fire_id`
// 			)
// 		res.sendStatus(204)
// 		connection.close()
// 	} catch (error) {
// 		next(error)
// 	}
// }

// export const getUserController = async (
// 	req: Request<{}, UserWithFireId[], {}>,
// 	res: Response<UserWithFireId[]>,
// 	next: NextFunction
// ) => {
// 	try {
// 		const connection = await pool.connect()
// 		const Users: mssql.IResult<UserWithFireId> = await connection.query(
// 			`SELECT * FROM ${DbTables.USER}`
// 		)
// 		connection.close()
// 		res.status(StatusCodes.OK).json(Users.recordset)
// 	} catch (error) {
// 		next(error)
// 	}
// }

// export const getUserByIdController = async (
// 	req: Request<{ id: string }, UserWithFireId[], {}>,
// 	res: Response<UserWithFireId[]>,
// 	next: NextFunction
// ) => {
// 	try {
// 		const connection = await pool.connect()
// 		const student: mssql.IResult<UserWithFireId> = await connection
// 			.request()
// 			.input("user_fire_id", mssql.VarChar, req.params.id)
// 			.query(
// 				`SELECT * FROM ${DbTables.USER} WHERE user_fire_id=@user_fire_id`
// 			)
// 		res.json(student.recordset)
// 	} catch (error) {
// 		next(error)
// 	}
// }

// export const getUserEventByIdController = async (
// 	req: Request<{ id: string }, EventWithOrganiser[], {}>,
// 	res: Response<EventWithOrganiser[]>,
// 	next: NextFunction
// ) => {
// 	try {
// 		const connection = await pool.connect()
// 		const events: mssql.IResult<EventWithOrganiser> = await connection
// 			.request()
// 			.input("user_fire_id", mssql.VarChar, req.params.id).query(`
//                 SELECT e.*, parent_uuid, organiser_name
//                 FROM ${DbTables.USER} u
//                 JOIN ${DbTables.PARTICIPATION} p ON u.user_fire_id=p.user_fire_id
//                 JOIN ${DbTables.EVENT} e on p.event_uuid=e.event_uuid
//                 JOIN ${DbTables.ORGANISER} o on e.organiser_uuid=o.organiser_uuid
//                 WHERE u.user_fire_id=@user_fire_id
//             `)
// 		res.json(events.recordset)
// 	} catch (error) {
// 		next(error)
// 	}
// }
