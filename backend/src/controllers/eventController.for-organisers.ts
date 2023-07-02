import { Request, Response, NextFunction } from "express"
import mssql from "mssql"
import { pool } from "../utils/dbConfig"
import { DbTables, StatusCodes } from "../utils/constant"
import {
	EventWithJwt,
	EventWithOrganiser,
	EventWithUUID,
} from "../interfaces/event"
import { JwtToken } from "../interfaces/jwtToken"
import { ParticipationWithUUID } from "../interfaces/participation"
import { OrganiserEventQueryParams } from "../interfaces/queryParams"

// * Used by organisers to create event
export const createEventController = async (
	req: Request<{}, EventWithUUID[], EventWithJwt>,
	res: Response<EventWithUUID[]>,
	next: NextFunction
) => {
	try {
		const connection = await pool.connect()
		const create: mssql.IResult<EventWithUUID> = await connection
			.request()
			.input("user_fire_id", req.body.user.user_fire_id)
			.input("event_ems_no", mssql.VarChar, req.body.event_ems_no)
			.input("event_ems_link", mssql.VarChar, req.body.event_ems_link)
			.input(
				"event_start_date",
				mssql.SmallDateTime,
				req.body.event_start_date
			)
			.input(
				"event_end_date",
				mssql.SmallDateTime,
				req.body.event_end_date
			)
			.input("event_title", mssql.VarChar, req.body.event_title)
			.input("event_desc", mssql.VarChar, req.body.event_desc)
			.input("event_mode", mssql.Char, req.body.event_mode)
			.input("event_venue", mssql.VarChar, req.body.event_venue)
			.input("event_capacity", mssql.Int, req.body.event_capacity)
			.input("event_status", mssql.Char, req.body.event_status)
			.input(
				"event_reg_start_date",
				mssql.SmallDateTime,
				req.body.event_reg_start_date
			)
			.input(
				"event_reg_end_date",
				mssql.SmallDateTime,
				req.body.event_reg_end_date
			)
			.input(
				"event_reg_google_form",
				mssql.VarChar,
				req.body.event_reg_google_form
			).query(`
                INSERT INTO ${DbTables.EVENT}  
				OUTPUT INSERTED.*
				VALUES (
                    DEFAULT,
                    (SELECT organiser_uuid FROM ${DbTables.ORGANISER} WHERE user_fire_id=@user_fire_id),
                    @event_ems_no,
                    @event_ems_link,
                    @event_start_date,
                    @event_end_date,
                    @event_title,
                    @event_desc,
                    @event_mode,
                    @event_venue,
                    @event_capacity,
                    @event_status,
                    @event_reg_start_date,
                    @event_reg_end_date,
                    @event_reg_google_form
                )`)
		res.json(create.recordset)
		connection.close()
	} catch (error) {
		next(error)
	}
}

/**
 * Used by organisers to update events
 * * First checks whether the event exists -> throw error if not found
 * * Then checks whether user is the organiser for the event -> throw error if not
 */
export const updateEventController = async (
	req: Request<{ id: string }, EventWithUUID[], EventWithJwt>,
	res: Response<EventWithUUID[]>,
	next: NextFunction
) => {
	try {
		const connection = await pool.connect()
		const updated: mssql.IResult<EventWithUUID> = await connection
			.request()
			.input("event_uuid", mssql.UniqueIdentifier, req.params.id)
			.input("user_fire_id", req.body.user.user_fire_id)
			.input("event_ems_no", mssql.VarChar, req.body.event_ems_no)
			.input("event_ems_link", mssql.VarChar, req.body.event_ems_link)
			.input(
				"event_start_date",
				mssql.SmallDateTime,
				req.body.event_start_date
			)
			.input(
				"event_end_date",
				mssql.SmallDateTime,
				req.body.event_end_date
			)
			.input("event_title", mssql.VarChar, req.body.event_title)
			.input("event_desc", mssql.VarChar, req.body.event_desc)
			.input("event_mode", mssql.Char, req.body.event_mode)
			.input("event_venue", mssql.VarChar, req.body.event_venue)
			.input("event_capacity", mssql.Int, req.body.event_capacity)
			.input("event_status", mssql.VarChar, req.body.event_status)
			.input(
				"event_reg_start_date",
				mssql.SmallDateTime,
				req.body.event_reg_start_date
			)
			.input(
				"event_reg_end_date",
				mssql.SmallDateTime,
				req.body.event_reg_end_date
			)
			.input(
				"event_reg_google_form",
				mssql.VarChar,
				req.body.event_reg_google_form
			)
			.query(
				`
                -- check if event exists
                IF EXISTS(SELECT 1 FROM ${DbTables.EVENT} WHERE event_uuid=@event_uuid)
                BEGIN
                    -- check if user is authorised to update the event
                    IF EXISTS(SELECT 1 FROM ${DbTables.EVENT} e JOIN ${DbTables.ORGANISER} o ON e.organiser_uuid=o.organiser_uuid WHERE e.event_uuid=@event_uuid AND o.user_fire_id=@user_fire_id)
                    BEGIN
                        UPDATE ${DbTables.EVENT} 
                        SET [event_ems_no] = @event_ems_no, 
                            [event_ems_link] = @event_ems_link,
                            [event_start_date] = @event_start_date, 
                            [event_end_date] = @event_end_date,
                            [event_title] = @event_title,
                            [event_desc] = @event_desc, 
                            [event_venue] = @event_venue,
                            [event_capacity] = @event_capacity, 
                            [event_status] = @event_status
                        OUTPUT
                            INSERTED.*
                        WHERE 
                            [event_uuid]=@event_uuid AND organiser_uuid=(SELECT organiser_uuid FROM ${DbTables.ORGANISER} WHERE user_fire_id=@user_fire_id)
                    END
                    ELSE 
                    BEGIN
                        THROW 50403, 'Not authorised to edit other organiser''s event', 1
                    END
                END
                ELSE
                BEGIN
                    THROW 50404, 'Event not found', 1
                END
			`
			)
		res.json(updated.recordset)
		connection.close()
	} catch (error: any) {
		if (error?.number === 50403) res.status(403)
		else if (error?.number === 50404) res.status(404)
		next(error)
	}
}

// * Used by organisers to view their own events. Child organisers can only view their own events; parent organisers can view their own + children's events
export const getOrganiserEventController = async (
	req: Request<{}, EventWithOrganiser[], JwtToken, OrganiserEventQueryParams>,
	res: Response<EventWithOrganiser[]>,
	next: NextFunction
) => {
	try {
		let eventStatus = ""
		if (req.query?.event_status)
			eventStatus = "AND e.event_status=@event_status"
		const connection = await pool.connect()
		const events: mssql.IResult<EventWithOrganiser> = await connection
			.request()
			.input("user_fire_id", req.body.user.user_fire_id)
			.input("event_status", mssql.Char, req.query?.event_status).query(`
                DECLARE @userOrganiserUUID UNIQUEIDENTIFIER;
                SELECT 
                    @userOrganiserUUID=organiser_uuid
                FROM 
                    ${DbTables.ORGANISER}
                WHERE
                    user_fire_id=@user_fire_id

                SELECT
                    e.*,
                    COALESCE(subquery.no_participants, 0) as no_participants,
                    o.parent_uuid,
                    o.organiser_name,
                    user_fire_id
                FROM
                    ${DbTables.EVENT} e JOIN ${DbTables.ORGANISER} o ON e.organiser_uuid=o.organiser_uuid
                    LEFT JOIN (SELECT event_uuid, COUNT(*) as no_participants FROM ${DbTables.PARTICIPATION} GROUP BY event_uuid) AS subquery ON e.event_uuid=subquery.event_uuid
                WHERE
                    (e.organiser_uuid=@userOrganiserUUID OR o.parent_uuid=@userOrganiserUUID) ${eventStatus}
            `)
		res.json(events.recordset)
		connection.close()
	} catch (error) {
		next(error)
	}
}

// * Used by organisers to view a specific event. Child organisers can only view their own events; parent organisers can view their own + children's events
export const getEventByIDController = async (
	req: Request<{ id: string }, EventWithOrganiser[], JwtToken, {}>,
	res: Response<EventWithOrganiser[]>,
	next: NextFunction
) => {
	try {
		const connection = await pool.connect()
		const event: mssql.IResult<EventWithOrganiser> = await connection
			.request()
			.input("event_uuid", mssql.UniqueIdentifier, req.params.id)
			.input("user_fire_id", req.body.user.user_fire_id).query(`
            DECLARE @userOrganiserUUID UNIQUEIDENTIFIER;
            SELECT 
                @userOrganiserUUID=organiser_uuid
            FROM 
                ${DbTables.ORGANISER}
            WHERE
                user_fire_id=@user_fire_id

            SELECT
                e.*,
                subquery.no_participants,
                o.parent_uuid,
                o.organiser_name,
                user_fire_id
            FROM
                ${DbTables.EVENT} e JOIN ${DbTables.ORGANISER} o ON e.organiser_uuid=o.organiser_uuid
                LEFT JOIN (SELECT event_uuid, COUNT(*) as no_participants FROM ${DbTables.PARTICIPATION} GROUP BY event_uuid) AS subquery ON e.event_uuid=subquery.event_uuid
            WHERE
                (e.organiser_uuid=@userOrganiserUUID OR o.parent_uuid=@userOrganiserUUID) AND e.event_uuid=@event_uuid
            `)
		res.json(event.recordset)
		connection.close()
	} catch (error) {
		next(error)
	}
}

// * Used by organisers to delete a specific event
export const deleteEventController = async (
	req: Request<{ id: string }, {}, JwtToken, {}>,
	res: Response<{}>,
	next: NextFunction
) => {
	try {
		const connection = await pool.connect()
		await connection
			.request()
			.input("event_uuid", mssql.UniqueIdentifier, req.params.id)
			.input("user_fire_id", req.body.user.user_fire_id).query(`
            -- check if event exists
            IF EXISTS(SELECT 1 FROM ${DbTables.EVENT} WHERE event_uuid=@event_uuid)
            BEGIN
                -- check if user is authorised to update the event
                IF EXISTS(SELECT 1 FROM ${DbTables.EVENT} e JOIN ${DbTables.ORGANISER} o ON e.organiser_uuid=o.organiser_uuid WHERE e.event_uuid=@event_uuid AND o.user_fire_id=@user_fire_id)
                BEGIN
                    DELETE FROM ${DbTables.EVENT} WHERE [event_uuid]=@event_uuid
                END
                ELSE 
                BEGIN
                    THROW 50403, 'Not authorised to delete other organiser''s event', 1
                END
            END
            ELSE
            BEGIN
                THROW 50404, 'Event not found', 1
            END
            `)
		res.sendStatus(StatusCodes.NO_CONTENT)
		connection.close()
	} catch (error: any) {
		if (error?.number === 50403) res.status(403)
		else if (error?.number === 50404) res.status(404)
		next(error)
	}
}

// * Used by organisers to get participants details for an event
export const getEventParticipationController = async (
	req: Request<{ id: string }, ParticipationWithUUID[], JwtToken, {}>,
	res: Response<ParticipationWithUUID[]>,
	next: NextFunction
) => {
	try {
		const connection = await pool.connect()
		const participants: mssql.IResult<ParticipationWithUUID> =
			await connection
				.request()
				.input("event_uuid", mssql.UniqueIdentifier, req.params.id)
				.input("user_fire_id", req.body.user.user_fire_id)
				.query(
					`
                DECLARE @userOrganiserUUID UNIQUEIDENTIFIER;
                SELECT 
                    @userOrganiserUUID=organiser_uuid
                FROM
                    ${DbTables.ORGANISER}
                WHERE
                    user_fire_id=@user_fire_id;

                -- check if event exists
                IF EXISTS(SELECT 1 FROM ${DbTables.EVENT} WHERE event_uuid=@event_uuid)
                BEGIN
                    -- check if user is authorised to update the event
                    IF EXISTS(SELECT 1 FROM ${DbTables.EVENT} e JOIN ${DbTables.ORGANISER} o ON e.organiser_uuid=o.organiser_uuid WHERE e.event_uuid=@event_uuid AND (o.organiser_uuid=@userOrganiserUUID OR o.parent_uuid=@userOrganiserUUID))
                    BEGIN
                        SELECT 
                            p.participation_uuid,
                            p.event_uuid,
                            p.participation_year,
                            p.participation_semester,
                            p.participation_attendance,
                            u.*
                        FROM 
                            ${DbTables.PARTICIPATION} p JOIN ${DbTables.USER} u ON p.user_fire_id=u.user_fire_id
                        WHERE 
                            event_uuid=@event_uuid
                    END
                    ELSE 
                    BEGIN
                        THROW 50403, 'Not authorised to view other organiser''s event', 1
                    END
                END
                ELSE
                BEGIN
                    THROW 50404, 'Event not found', 1
                END
`
				)
		res.send(participants.recordset)
		connection.close()
	} catch (error: any) {
		if (error?.number === 50403) res.status(403)
		else if (error?.number === 50404) res.status(404)
		next(error)
	}
}
