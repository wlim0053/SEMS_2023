import { Request, Response } from "express"
import mssql from "mssql"
import { pool } from "../utils/dbConfig"
import { DbTables, StatusCodes } from "../utils/constant"

export const createDisciplineController = async (
	req: Request,
	res: Response
) => {
	try {
		const connection = await pool.connect()
		const create = await connection
			.request()
			.input("dis_name", mssql.VarChar, req.body.dis_name)
			.input("school_uuid", mssql.UniqueIdentifier, req.body.school_uuid)
			.query(`
                INSERT INTO ${DbTables.DISCIPLINE} (dis_name, school_uuid)
                OUTPUT INSERTED.*
                VALUES (@dis_name, @school_uuid)
            `)
		res.send({ data: create.recordset })
	} catch (error) {
		res.status(404).send(error)
	}
}

export const updateDisciplineController = async (
	req: Request,
	res: Response
) => {
	const id = req.params.id
	try {
		const connection = await pool.connect()
		const update = await connection
			.request()
			.input("dis_uuid", mssql.UniqueIdentifier, id)
			.input("dis_name", mssql.VarChar, req.body.dis_name)
			.input("school_uuid", mssql.UniqueIdentifier, req.body.school_uuid)
			.query(`
            UPDATE ${DbTables.DISCIPLINE} SET
                [dis_name]=@dis_name,
                [school_uuid]=@school_uuid
            OUTPUT INSERTED.*
            WHERE [dis_uuid]=@dis_uuid
        `)
		res.send({ data: update.recordset })
		connection.close()
	} catch (error) {
		res.status(404).send(error)
	}
}

export const deleteDisciplineController = async (
	req: Request,
	res: Response
) => {
	const id = req.params.id
	try {
		const connection = await pool.connect()
		const deleted = await connection
			.request()
			.input("dis_uuid", mssql.UniqueIdentifier, id).query(`
            DELETE FROM ${DbTables.DISCIPLINE} WHERE [dis_uuid]=@dis_uuid
        `)
		res.sendStatus(204)
		connection.close()
	} catch (error) {
		res.status(404).send(error)
	}
}

export const getDisciplineController = async (req: Request, res: Response) => {
	try {
		const connection = await pool.connect()
		const disciplines = await connection
			.request()
			.query(`SELECT * FROM ${DbTables.DISCIPLINE}`)
		res.send({ data: disciplines.recordset })
		connection.close()
	} catch (error) {
		res.status(404).send(error)
	}
}

export const getDisciplineByIdController = async (
	req: Request,
	res: Response
) => {
	const id = req.params.id
	try {
		const connection = await pool.connect()
		const discipline = await connection
			.request()
			.input("dis_uuid", mssql.UniqueIdentifier, id).query(`
            SELECT * FROM ${DbTables.DISCIPLINE} WHERE [dis_uuid]=@dis_uuid
        `)
		res.send({ data: discipline.recordset })
		connection.close()
	} catch (error) {
		res.status(404).send(error)
	}
}
