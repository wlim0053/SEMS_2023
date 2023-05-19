import { NextFunction, Request, Response } from "express"
import mssql from "mssql"
import { pool } from "../utils/dbConfig"
import { DbTables, StatusCodes } from "../utils/constant"
import {
	Specialisation,
	SpecialisationWithUUID,
} from "../interfaces/specialisation"

export const createSpecialisationController = async (
	req: Request<{}, SpecialisationWithUUID[], Specialisation>,
	res: Response<SpecialisationWithUUID[]>,
	next: NextFunction
) => {
	try {
		const connection = await pool.connect()
		const create: mssql.IResult<SpecialisationWithUUID> = await connection
			.request()
			.input("school_uuid", mssql.UniqueIdentifier, req.body.school_uuid)
			.input("spec_level", mssql.Char, req.body.spec_level)
			.input("spec_name", mssql.VarChar, req.body.spec_name).query(`
                INSERT INTO ${DbTables.SPECIALISATION} (school_uuid, spec_level, spec_name)
                OUTPUT INSERTED.*
                VALUES (@school_uuid, @spec_level, @spec_name)
            `)
		res.json(create.recordset)
	} catch (error) {
		next(error)
	}
}

// ! Not sure POST and DELETE need or not
// export const updateSpecialisationController = async (
// 	req: Request<{ id: string }, SpecialisationWithUUID[], Specialisation>,
// 	res: Response<SpecialisationWithUUID[]>,
// 	next: NextFunction
// ) => {
// 	try {
// 		const connection = await pool.connect()
// 		const update: mssql.IResult<SpecialisationWithUUID> = await connection
// 			.request()
// 			.input("spec_uuid", mssql.UniqueIdentifier, req.params.id)
// 			.input("school_uuid", mssql.UniqueIdentifier, req.body.school_uuid)
// 			.input("spec_level", mssql.Char, req.body.spec_level)
// 			.input("spec_name", mssql.VarChar, req.body.spec_name).query(`
//             UPDATE ${DbTables.SPECIALISATION} SET
//                 [school_uuid]=@school_uuid
//                 [spec_level]=@spec_level,
//                 [spec_name]=@spec_name
//             OUTPUT INSERTED.*
//             WHERE [spec_uuid]=@spec_uuid
//         `)
// 		res.json(update.recordset)
// 		connection.close()
// 	} catch (error) {
// 		next(error)
// 	}
// }

// export const deleteSpecialisationController = async (
// 	req: Request<{ id: string }, {}, {}>,
// 	res: Response<{}>,
// 	next: NextFunction
// ) => {
// 	try {
// 		const connection = await pool.connect()
// 		const deleted = await connection
// 			.request()
// 			.input("dis_uuid", mssql.UniqueIdentifier, req.params.id).query(`
//             DELETE FROM ${DbTables.SPECIALISATION} WHERE [spec_uuid]=@spec_uuid
//         `)
// 		res.sendStatus(204)
// 		connection.close()
// 	} catch (error) {
// 		next(error)
// 	}
// }

export const getSpecialisationController = async (
	req: Request<{}, SpecialisationWithUUID[], {}>,
	res: Response<SpecialisationWithUUID[]>,
	next: NextFunction
) => {
	try {
		const connection = await pool.connect()
		const disciplines: mssql.IResult<SpecialisationWithUUID> =
			await connection
				.request()
				.query(`SELECT * FROM ${DbTables.SPECIALISATION}`)
		res.json(disciplines.recordset)
		connection.close()
	} catch (error) {
		next(error)
	}
}

export const getSpecialisationByIdController = async (
	req: Request<{ id: string }, SpecialisationWithUUID[], {}>,
	res: Response<SpecialisationWithUUID[]>,
	next: NextFunction
) => {
	try {
		const connection = await pool.connect()
		const discipline = await connection
			.request()
			.input("spec_uuid", mssql.UniqueIdentifier, req.params.id).query(`
            SELECT * FROM ${DbTables.SPECIALISATION} WHERE [spec_uuid]=@spec_uuid
        `)
		res.json(discipline.recordset)
		connection.close()
	} catch (error) {
		next(error)
	}
}
