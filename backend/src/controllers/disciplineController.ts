import { NextFunction, Request, Response } from "express"
import mssql from "mssql"
import { pool } from "../utils/dbConfig"
import { DbTables, StatusCodes } from "../utils/constant"
import { Discipline, DisciplineWithUUID } from "../interfaces/discipline"

export const createDisciplineController = async (
	req: Request<{}, DisciplineWithUUID[], Discipline>,
	res: Response<DisciplineWithUUID[]>,
	next: NextFunction
) => {
	try {
		const connection = await pool.connect()
		const create: mssql.IResult<DisciplineWithUUID> = await connection
			.request()
			.input("dis_name", mssql.VarChar, req.body.dis_name)
			.input("school_uuid", mssql.UniqueIdentifier, req.body.school_uuid)
			.query(`
                INSERT INTO ${DbTables.DISCIPLINE} (dis_name, school_uuid)
                OUTPUT INSERTED.*
                VALUES (@dis_name, @school_uuid)
            `)
		res.json(create.recordset)
	} catch (error) {
		next(error)
	}
}

export const updateDisciplineController = async (
	req: Request<{ id: string }, DisciplineWithUUID[], Discipline>,
	res: Response<DisciplineWithUUID[]>,
	next: NextFunction
) => {
	try {
		const connection = await pool.connect()
		const update: mssql.IResult<DisciplineWithUUID> = await connection
			.request()
			.input("dis_uuid", mssql.UniqueIdentifier, req.params.id)
			.input("dis_name", mssql.VarChar, req.body.dis_name)
			.input("school_uuid", mssql.UniqueIdentifier, req.body.school_uuid)
			.query(`
            UPDATE ${DbTables.DISCIPLINE} SET
                [dis_name]=@dis_name,
                [school_uuid]=@school_uuid
            OUTPUT INSERTED.*
            WHERE [dis_uuid]=@dis_uuid
        `)
		res.json(update.recordset)
		connection.close()
	} catch (error) {
		next(error)
	}
}

export const deleteDisciplineController = async (
	req: Request<{ id: string }, {}, {}>,
	res: Response<{}>,
	next: NextFunction
) => {
	try {
		const connection = await pool.connect()
		const deleted = await connection
			.request()
			.input("dis_uuid", mssql.UniqueIdentifier, req.params.id).query(`
            DELETE FROM ${DbTables.DISCIPLINE} WHERE [dis_uuid]=@dis_uuid
        `)
		res.sendStatus(204)
		connection.close()
	} catch (error) {
		next(error)
	}
}

export const getDisciplineController = async (
	req: Request<{}, DisciplineWithUUID[], {}>,
	res: Response<DisciplineWithUUID[]>,
	next: NextFunction
) => {
	try {
		const connection = await pool.connect()
		const disciplines: mssql.IResult<DisciplineWithUUID> = await connection
			.request()
			.query(`SELECT * FROM ${DbTables.DISCIPLINE}`)
		res.json(disciplines.recordset)
		connection.close()
	} catch (error) {
		next(error)
	}
}

export const getDisciplineByIdController = async (
	req: Request<{ id: string }, DisciplineWithUUID[], {}>,
	res: Response<DisciplineWithUUID[]>,
	next: NextFunction
) => {
	try {
		const connection = await pool.connect()
		const discipline = await connection
			.request()
			.input("dis_uuid", mssql.UniqueIdentifier, req.params.id).query(`
            SELECT * FROM ${DbTables.DISCIPLINE} WHERE [dis_uuid]=@dis_uuid
        `)
		res.json(discipline.recordset)
		connection.close()
	} catch (error) {
		next(error)
	}
}
