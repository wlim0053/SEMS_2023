import { Request, Response, NextFunction } from "express"
import mssql from "mssql"
import { pool } from "../utils/dbConfig"
import { DbTables, StatusCodes } from "../utils/constant"
import { EventWithUUID } from "../interfaces/event"

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
	} catch (error) {
		next(error)
	}
}

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
	} catch (error) {
		next(error)
	}
}
