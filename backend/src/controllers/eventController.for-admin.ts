import { Request, Response, NextFunction } from "express"
import mssql from "mssql"
import { pool } from "../utils/dbConfig"
import { DbTables, StatusCodes } from "../utils/constant"
import { EventWithOrganiser, EventWithUUID } from "../interfaces/event"

// * Used by admins to mark event as approved
export const approveEventController = async (
	req: Request<
		{ id: string },
		EventWithUUID[],
		{ event_ems_no: string; event_ems_link: string },
		{}
	>,
	res: Response<EventWithUUID[]>,
	next: NextFunction
) => {
	try {
		const connection = await pool.connect()
		const update: mssql.IResult<EventWithUUID> = await connection
			.request()
			.input("event_uuid", mssql.UniqueIdentifier, req.params.id)
			.input("event_ems_no", mssql.VarChar, req.body.event_ems_no)
			.input("event_ems_link", mssql.VarChar, req.body.event_ems_link)
			.query(`
                UPDATE 
                    ${DbTables.EVENT}
                SET
                    event_ems_no=@event_ems_no,
                    event_ems_link=@event_ems_link,
                    event_status='A'
                OUTPUT
                    INSERTED.*
                WHERE
                    event_uuid=@event_uuid 
            `)
		res.json(update.recordset)
		connection.close()
		next()
	} catch (error) {
		next(error)
	}
}

// * Used by admins to mark event as rejected
export const rejectEventController = async (
	req: Request<{ id: string }, EventWithUUID[], {}, {}>,
	res: Response<EventWithUUID[]>,
	next: NextFunction
) => {
	try {
		const connection = await pool.connect()
		const update: mssql.IResult<EventWithUUID> = await connection
			.request()
			.input("event_uuid", mssql.UniqueIdentifier, req.params.id).query(`
            UPDATE 
                ${DbTables.EVENT}
            SET
                event_status='R'
            OUTPUT
                INSERTED.*
            WHERE
                event_uuid=@event_uuid
        `)
		res.json(update.recordset)
		connection.close()
		next()
	} catch (error) {
		next(error)
	}
}

// * Used by admins to get PENDING events
export const getPendingEvents = async (
	req: Request,
	res: Response<EventWithOrganiser[]>,
	next: NextFunction
) => {
	try {
		const connection = await pool.connect()
		const result: mssql.IResult<EventWithOrganiser> =
			await connection.request().query(`
            SELECT
                e.*,
                o.user_fire_id,
                o.parent_uuid,
                o.organiser_name
            FROM
                ${DbTables.EVENT} e JOIN ${DbTables.ORGANISER} o ON e.organiser_uuid=o.organiser_uuid
            WHERE
                e.event_status='P'
            ORDER BY
                e.event_start_date ASC
        `)
		res.send(result.recordset)
		connection.close()
	} catch (error) {
		next(error)
	}
}
