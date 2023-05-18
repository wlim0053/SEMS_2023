import { NextFunction, Request, Response } from "express";
import mssql from "mssql";
import { pool } from "../utils/dbConfig";
import { DbTables, StatusCodes } from "../utils/constant";
import {
    Feedback,
    FeedbackWithUUID,
    FeedbackWithParticipation,
} from "../interfaces/feedback";

export const createFeedbackController = async (
    req: Request<{}, FeedbackWithUUID[], Feedback>,
    res: Response<FeedbackWithUUID[]>,
    next: NextFunction
) => {
    try {
        const connection = await pool.connect();
        const create: mssql.IResult<FeedbackWithUUID> = await connection
            .request()
            .input("participation_uuid", mssql.UniqueIdentifier, req.body.participation_uuid)
            .input("feedback_comm", mssql.Int, req.body.feedback_comm)
            .input("feedback_proj", mssql.Int, req.body.feedback_proj)
            .input("feedback_solve", mssql.Int, req.body.feedback_solve)
            .input("feedback_teamwork", mssql.Int, req.body.feedback_teamwork)
            .input("feedback_reflection", mssql.VarChar, req.body.feedback_reflection)
            .query(
                `INSERT INTO ${DbTables.FEEDBACK}  
				OUTPUT INSERTED.*
				VALUES (
                    DEFAULT,
                    @participation_uuid,
                    @feedback_comm,
                    @feedback_proj,
                    @feedback_solve,
                    @feedback_teamwork,
                    @feedback_reflection
                )`);
        res.json(create.recordset);
        connection.close();
    } catch (error) {
        next(error);
    }
};

export const updateFeedbackController = async (
    req: Request<{ id: string }, FeedbackWithUUID[], Feedback>,
    res: Response<FeedbackWithUUID[]>,
    next: NextFunction
) => {
    try {
        const connection = await pool.connect();
        const updated: mssql.IResult<FeedbackWithUUID> = await connection
            .request()
            .input("feedback_uuid", mssql.UniqueIdentifier, req.params.id)
            .input("participation_uuid", mssql.UniqueIdentifier, req.body.participation_uuid)
            .input("feedback_comm", mssql.Int, req.body.feedback_comm)
            .input("feedback_proj", mssql.Int, req.body.feedback_proj)
            .input("feedback_solve", mssql.Int, req.body.feedback_solve)
        .input("feedback_teamwork", mssql.Int, req.body.feedback_teamwork)
        .input("feedback_reflection", mssql.VarChar, req.body.feedback_reflection)
        .query(
            `UPDATE ${DbTables.FEEDBACK} 
			SET [participation_uuid] = @participation_uuid, 
                [feedback_comm] = @feedback_comm,
                [feedback_proj] = @feedback_proj,
                [feedback_solve] = @feedback_solve,
                [feedback_teamwork] = @feedback_teamwork,
                [feedback_reflection] = @feedback_reflection
				OUTPUT INSERTED.*
			    WHERE [feedback_uuid] = @feedback_uuid`
                );
        res.json(updated.recordset);
        connection.close();
    } catch (error) {
        next(error);
    }
};

export const getFeedbackController = async (
    req: Request<{}, FeedbackWithParticipation[], {}>,
    res: Response<FeedbackWithParticipation[]>,
    next: NextFunction
) => {
    try {
        const connection = await pool.connect();
        const feedbacks: mssql.IResult<FeedbackWithParticipation> =
        await connection.query(`SELECT 
            feedback_uuid,
            p.participation_uuid,
            feedback_comm,
            feedback_proj,
            feedback_solve,
            feedback_teamwork,
            feedback_reflection,
            event_uuid,
            stu_fire_id
        FROM ${DbTables.FEEDBACK} f join ${DbTables.PARTICIPATION} p ON f.participation_uuid=p.participation_uuid`
        );
        res.status(StatusCodes.OK).json(feedbacks.recordset);
        connection.close();
    } catch (error) {
        next(error);
    }
};

export const getFeedbackByIDController = async (
    req: Request<{ id: string }, FeedbackWithParticipation[], {}>,
    res: Response<FeedbackWithParticipation[]>,
    next: NextFunction
) => {
    try {
        const connection = await pool.connect();
        const feedback: mssql.IResult<FeedbackWithParticipation> = await connection
        .request()
        .input("feedback_uuid", mssql.UniqueIdentifier, req.params.id)
        .query(`SELECT 
            feedback_uuid,
            p.participation_uuid,
            feedback_comm,
            feedback_proj,
            feedback_solve,
            feedback_teamwork,
            feedback_reflection,
            event_uuid,
            stu_fire_id
            FROM ${DbTables.FEEDBACK} f join ${DbTables.PARTICIPATION} p ON f.participation_uuid=p.participation_uuid 
            WHERE feedback_uuid = @feedback_uuid`
      );
        res.json(feedback.recordset);
        connection.close();
    } catch (error) {
        next(error);
    }
};

export const deleteFeedbackController = async (
	req: Request<{ id: string }, {}, {}>,
	res: Response<{}>,
	next: NextFunction
) => {
	try {
		const connection = await pool.connect()
		await connection
			.request()
			.input("feedback_uuid", mssql.UniqueIdentifier, req.params.id)
			.query(
				`DELETE FROM ${DbTables.FEEDBACK} WHERE [feedback_uuid] = @feedback_uuid`
			)
		res.sendStatus(StatusCodes.NO_CONTENT)
		connection.close()
	} catch (error) {
		next(error)
	}
}