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
			.input("user_fire_id", mssql.VarChar, req.body.user_fire_id).query(`
                INSERT INTO ${DbTables.ORGANISER} (user_fire_id, parent_uuid, organiser_name)
				VALUES (
                    @user_fire_id,
                    @parent_uuid,
                    @organiser_name
                )`)
		res.sendStatus(StatusCodes.NO_CONTENT)
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
			.input("user_fire_id", mssql.VarChar, req.body.user_fire_id)
			.query(
				`UPDATE ${DbTables.ORGANISER} 
			        SET [parent_uuid] = @parent_uuid, 
                        [organiser_name] = @organiser_name,
                        [user_fire_id] = @user_fire_id
			    WHERE [organiser_uuid] = @organiser_uuid`
			)
		res.sendStatus(StatusCodes.NO_CONTENT)
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
            u.user_fire_id,
            spec_uuid,
            user_email,
            user_fname,
            user_lname,
            user_id,
            user_gender,
            user_access_lvl,
            enrolment_year,
            enrolment_intake
        FROM ${DbTables.ORGANISER} o join ${DbTables.USER} u ON o.user_fire_id=u.user_fire_id`)
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
                u.user_fire_id,
                spec_uuid,
                user_email,
                user_fname,
                user_lname,
                user_id,
                user_gender,
                user_access_lvl,
                enrolment_year,
                enrolment_intake
            FROM ${DbTables.ORGANISER} o join ${DbTables.USER} u ON o.user_fire_id=u.user_fire_id 
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
