import { NextFunction, Request, Response } from "express"
import mssql from "mssql"
import { pool } from "../utils/dbConfig"
import { DbTables, StatusCodes } from "../utils/constant"
import {
	AttendeesCountBySchool,
	EventCountByOrganiser,
	GenderCountByEvent,
} from "../interfaces/stats"

export const getEventCountByOrganiser = async (
	req: Request<
		{},
		EventCountByOrganiser[],
		{},
		{ year: string; semester: string; organiser: string }
	>,
	res: Response<EventCountByOrganiser[]>,
	next: NextFunction
) => {
	const { year, semester, organiser } = req.query
	let select = ""
	let subquery = ""
	let groupBy = ""
	if (semester === "true" && organiser === "parent") {
		select = "subquery.sem,"
		subquery = `CASE
                WHEN MONTH(e.event_start_date) BETWEEN 1 AND 6 THEN 'SEM 1'
                ELSE 'SEM 2'
            END AS sem,`
		groupBy = `CASE
                WHEN MONTH(e.event_start_date) BETWEEN 1 AND 6 THEN 'SEM 1'
                ELSE 'SEM 2'
            END,`
	} else if (semester === "true" && organiser === "child") {
		select = `
            CASE
                WHEN MONTH(e.event_start_date) IS NULL THEN NULL
                WHEN MONTH(e.event_start_date) BETWEEN 1 AND 6 THEN 'SEM 1'
                ELSE 'SEM 2'
            END AS sem,
            `
		groupBy = `
            CASE
                WHEN MONTH(e.event_start_date) IS NULL THEN NULL
                WHEN MONTH(e.event_start_date) BETWEEN 1 AND 6 THEN 'SEM 1'
                ELSE 'SEM 2'
            END,
        `
	}

	try {
		const connection = await pool.connect()
		const stats: mssql.IResult<EventCountByOrganiser> = await connection
			.request()
			.input("year", parseInt(year))
			.query(
				organiser === "parent"
					? `
	    SELECT
	        o.organiser_name,
	        subquery.year,
	        ${select}
	        subquery.event_count
	    FROM (
	        SELECT
	            COALESCE(o.parent_uuid, o.organiser_uuid) AS parent_uuid,
	            YEAR(e.event_start_date) AS year,
	            ${subquery}
	            COUNT(*) as event_count
	        FROM
	            ${DbTables.ORGANISER} o JOIN ${DbTables.EVENT} e ON o.organiser_uuid=e.organiser_uuid
	        WHERE
	            YEAR(e.event_start_date)=@year AND event_status='A'
	        GROUP BY
	            COALESCE(o.parent_uuid, o.organiser_uuid),
	            ${groupBy}
	            YEAR(e.event_start_date)
	    ) AS subquery JOIN ${DbTables.ORGANISER} o ON subquery.parent_uuid=o.organiser_uuid
	    `
					: `
	    SELECT
	        o.organiser_name,
	        COALESCE(YEAR(e.event_start_date), @year) as event_year,
            ${select}
	        COUNT(e.event_uuid) as event_count
	    FROM
	        ${DbTables.ORGANISER} o LEFT JOIN ${DbTables.EVENT} e ON o.organiser_uuid=e.organiser_uuid AND YEAR(e.event_start_date)=@year AND e.event_status='A'
	    GROUP BY
	        o.organiser_name,
            ${groupBy}
	        COALESCE(YEAR(e.event_start_date), @year)
	    `
			)
		res.json(stats.recordset)
	} catch (error) {
		next(error)
	}
}

export const getAttendeesCountBySchool = async (
	req: Request<{}, AttendeesCountBySchool[], {}, { year: string }>,
	res: Response<AttendeesCountBySchool[]>,
	next: NextFunction
) => {
	const { year } = req.query
	try {
		const connection = await pool.connect()
		const stats: mssql.IResult<AttendeesCountBySchool[]> = await connection
			.request()
			.input("year", parseInt(year)).query(`
            SELECT
                school_name,
                spec_level,
                spec_name,
                COUNT(DISTINCT(u.user_fire_id)) as no_attendees
            FROM 
                ${DbTables.USER} u JOIN ${DbTables.PARTICIPATION} p ON u.user_fire_id=p.user_fire_id
                JOIN ${DbTables.EVENT} e ON p.event_uuid=e.event_uuid
                JOIN ${DbTables.SPECIALISATION} s1 ON u.spec_uuid=s1.spec_uuid
                JOIN ${DbTables.SCHOOL} s2 ON s1.school_uuid=s2.school_uuid
            WHERE
                e.event_status='A' AND p.participation_attendance=1 AND YEAR(e.event_start_date)=@year
            GROUP BY
                ROLLUP(school_name, spec_level, spec_name)
        `)
		res.json(stats.recordset)
	} catch (error) {
		next(error)
	}
}

export const getGenderCountByEvent = async (
	req: Request<{}, GenderCountByEvent[], {}, { year: string }>,
	res: Response<GenderCountByEvent[]>,
	next: NextFunction
) => {
	const { year } = req.query
	try {
		const connection = await pool.connect()
		const stats: mssql.IResult<GenderCountByEvent[]> = await connection
			.request()
			.input("year", parseInt(year)).query(`
            SELECT 
                event_title,
                CASE user_gender
                    WHEN 0 THEN 'FEMALE'
                    ELSE 'MALE'
                END AS gender,
                COUNT(*) AS gender_count
            FROM
                ${DbTables.USER} u JOIN ${DbTables.PARTICIPATION} p ON u.user_fire_id=p.user_fire_id
                JOIN ${DbTables.EVENT} e ON p.event_uuid=e.event_uuid
            WHERE
                e.event_status='A' AND p.participation_attendance=1 AND YEAR(e.event_start_date)=@year
            GROUP BY
                event_title,
                CASE user_gender
                    WHEN 0 THEN 'FEMALE'
                    ELSE 'MALE'
                END
        `)
		res.json(stats.recordset)
	} catch (error) {
		next(error)
	}
}
