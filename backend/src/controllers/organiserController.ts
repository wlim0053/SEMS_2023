import { NextFunction, Request, Response } from "express"
import mssql from "mssql"
import { pool } from "../utils/dbConfig"
import { DbTables, StatusCodes } from "../utils/constant"
import {
	OrganiserRequestBody,
	Organiser,
	OrganiserWithStudent,
	OrganiserWithUUID,
} from "../interfaces/organiser"
import { AdminOrganiserQueryParams } from "../interfaces/queryParams"

// * Used by Admins to add new organisers
export const createOrganiserController = async (
	req: Request<{}, {}, OrganiserRequestBody>,
	res: Response<{}>,
	next: NextFunction
) => {
	try {
		const connection = await pool.connect()
		await connection
			.request()
			.input("user_email", req.body.user_email)
			.input("parent_uuid", mssql.UniqueIdentifier, req.body.parent_uuid)
			.input("organiser_name", mssql.VarChar, req.body.organiser_name)
			.query(`
                DECLARE @userFireId VARCHAR(255)
                SELECT
                    @userFireId=user_fire_id
                FROM
                    ${DbTables.USER}
                WHERE
                    user_email=@user_email

                IF @@ROWCOUNT=0
                THROW 50404, 'Email not found', 1

                INSERT INTO ${DbTables.ORGANISER}
				VALUES (
                    DEFAULT,
                    @userFireId,
                    @parent_uuid,
                    @organiser_name
                )`)
		res.sendStatus(StatusCodes.CREATED)
		connection.close()
	} catch (error: any) {
		if (error?.number === 50404) res.status(404)
		next(error)
	}
}

// * Used by Admins to update organiser details
export const updateOrganiserController = async (
	req: Request<{ id: string }, OrganiserWithUUID[], OrganiserRequestBody>,
	res: Response<OrganiserWithUUID[]>,
	next: NextFunction
) => {
	try {
		const connection = await pool.connect()
		await connection
			.request()
			.input("organiser_uuid", mssql.UniqueIdentifier, req.params.id)
			.input("user_email", req.body.user_email)
			.input("parent_uuid", mssql.UniqueIdentifier, req.body.parent_uuid)
			.input("organiser_name", mssql.VarChar, req.body.organiser_name)
			.query(
				`
                DECLARE @userFireId VARCHAR(255)
                SELECT
                    @userFireId=user_fire_id
                FROM
                    ${DbTables.USER}
                WHERE
                    user_email=@user_email

                IF @@ROWCOUNT=0
                THROW 50404, 'Email not found', 1
                
                UPDATE ${DbTables.ORGANISER} 
                SET 
                    [parent_uuid]=@parent_uuid, 
                    [organiser_name]=@organiser_name,
                    [user_fire_id]=@userFireId
			    WHERE 
                    [organiser_uuid]=@organiser_uuid`
			)
		res.sendStatus(StatusCodes.NO_CONTENT)
		connection.close()
	} catch (error) {
		next(error)
	}
}

// * Used on Admin Organiser List
// * When creating organisers need to specify whether they have a parent club -> `WHERE parent_uuid IS NULL`
export const getOrganiserController = async (
	req: Request<{}, OrganiserWithStudent[], {}, AdminOrganiserQueryParams>,
	res: Response<OrganiserWithStudent[]>,
	next: NextFunction
) => {
	try {
		const connection = await pool.connect()
		const { parent_uuid } = req.query

		let parentQuery = ""
		if (parent_uuid) {
			if (parent_uuid === "null")
				parentQuery = `WHERE parent_uuid IS NULL`
		}

		const organisers: mssql.IResult<OrganiserWithStudent> =
			await connection.request().query(`
	        SELECT
	            organiser_uuid,
	            parent_uuid,
	            organiser_name,
	            u.*
	        FROM
	            ${DbTables.ORGANISER} o JOIN ${DbTables.USER} u ON o.user_fire_id=u.user_fire_id
	        ${parentQuery}
	    `)
		res.json(organisers.recordset)
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
                u.*
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
