import { Request, Response, NextFunction } from "express"
import mssql from "mssql"
import { pool } from "../utils/dbConfig"
import { DbTables } from "../utils/constant"
import { EventWithOrganiser } from "../interfaces/event"
import { JwtToken } from "../interfaces/jwtToken"
import { StudentEventQueryParams } from "../interfaces/queryParams"

export const getStudentEventController = async (
	req: Request<{}, EventWithOrganiser[], JwtToken, StudentEventQueryParams>,
	res: Response<EventWithOrganiser[]>,
	next: NextFunction
) => {
	try {
		const connection = await pool.connect()
		const events: mssql.IResult<EventWithOrganiser> = await connection
			.request()
			.input("event_status", req.query.event_status).query(`
            SELECT
                e.*,
                o.parent_uuid,
                o.organiser_name,
                user_fire_id
            FROM 
                ${DbTables.EVENT} e JOIN ${DbTables.ORGANISER} o
            ON
                e.organiser_uuid=o.organiser_uuid
            WHERE
                e.event_status=@event_status
            ORDER BY
                e.event_start_date ASC
        `)
		res.json(events.recordset)
	} catch (error) {
		next(error)
	}
}
