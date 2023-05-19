import { NextFunction, Request, Response } from "express"
import mssql from "mssql"
import { pool } from "../utils/dbConfig"
import { DbTables, StatusCodes } from "../utils/constant"
import {
	Organiser,
	OrganiserWithStudent,
	OrganiserWithUUID,
} from "../interfaces/organiser"

export const createOrganiserController = async (
	req: Request<{}, OrganiserWithUUID[], Organiser>,
	res: Response<OrganiserWithUUID[]>,
	next: NextFunction
) => {
	try {
		const connection = await pool.connect()
		const create: mssql.IResult<OrganiserWithUUID> = await connection
			.request()
			.input("parent_uuid", mssql.UniqueIdentifier, req.body.parent_uuid)
			.input("organiser_name", mssql.VarChar, req.body.organiser_name)
			.input("stu_fire_id", mssql.VarChar, req.body.stu_fire_id).query(`
                INSERT INTO ${DbTables.ORGANISER}  
				OUTPUT INSERTED.*
				VALUES (
                    DEFAULT,
                    @parent_uuid,
                    @organiser_name,
                    @stu_fire_id
                )`)
		res.json(create.recordset)
		connection.close()
	} catch (error) {
		next(error)
	}
}

export const updateOrganiserController = async (
	req: Request<{ id: string }, OrganiserWithUUID[], Organiser>,
	res: Response<OrganiserWithUUID[]>,
	next: NextFunction
) => {
	try {
		const connection = await pool.connect()
		const updated: mssql.IResult<OrganiserWithUUID> = await connection
			.request()
			.input("organiser_uuid", mssql.UniqueIdentifier, req.params.id)
			.input("parent_uuid", mssql.UniqueIdentifier, req.body.parent_uuid)
			.input("organiser_name", mssql.VarChar, req.body.organiser_name)
			.input("stu_fire_id", mssql.VarChar, req.body.stu_fire_id)
			.query(
				`UPDATE ${DbTables.ORGANISER} 
			        SET [parent_uuid] = @parent_uuid, 
                        [organiser_name] = @organiser_name,
                        [stu_fire_id] = @stu_fire_id
				OUTPUT INSERTED.*
			    WHERE [organiser_uuid] = @organiser_uuid`
			)
		res.json(updated.recordset)
		connection.close()
	} catch (error) {
		next(error)
	}
}

export const getOrganiserController = async (
	req: Request<{}, OrganiserWithStudent[], {}>,
	res: Response<OrganiserWithStudent[]>,
	next: NextFunction
) => {
	try {
		const connection = await pool.connect()
		const organisers: mssql.IResult<OrganiserWithStudent> =
			await connection.query(`SELECT 
            organiser_uuid,
            parent_uuid,
            organiser_name,
            s.stu_fire_id,
            spec_uuid,
            stu_email,
            stu_name,
            stu_id,
            stu_gender,
            enrolment_year,
            enrolment_intake
        FROM ${DbTables.ORGANISER} o join ${DbTables.STUDENT} s ON o.stu_fire_id=s.stu_fire_id`)
		res.status(StatusCodes.OK).json(organisers.recordset)
		connection.close()
	} catch (error) {
		next(error)
	}
}

export const getOrganiserByIDController = async (
	req: Request<{ id: string }, OrganiserWithStudent[], {}>,
	res: Response<OrganiserWithStudent[]>,
	next: NextFunction
) => {
	try {
		const connection = await pool.connect()
		const organiser: mssql.IResult<OrganiserWithStudent> = await connection
			.request()
			.input("organiser_uuid", mssql.UniqueIdentifier, req.params.id)
			.query(
				`SELECT 
                organiser_uuid,
                parent_uuid,
                organiser_name,
                s.stu_fire_id,
                spec_uuid,
                stu_email,
                stu_name,
                stu_id,
                stu_gender,
                enrolment_year,
                enrolment_intake
            FROM ${DbTables.ORGANISER} o join ${DbTables.STUDENT} s ON o.stu_fire_id=s.stu_fire_id 
			WHERE organiser_uuid = @organiser_uuid`
			)
		res.json(organiser.recordset)
		connection.close()
	} catch (error) {
		next(error)
	}
}

export const deleteOrganiserController = async (
	req: Request<{ id: string }, {}, {}>,
	res: Response<{}>,
	next: NextFunction
) => {
	try {
		const connection = await pool.connect()
		await connection
			.request()
			.input("organiser_uuid", mssql.UniqueIdentifier, req.params.id)
			.query(
				`DELETE FROM ${DbTables.ORGANISER} WHERE [organiser_uuid] = @organiser_uuid`
			)
		res.sendStatus(StatusCodes.NO_CONTENT)
		connection.close()
	} catch (error) {
		next(error)
	}
}
