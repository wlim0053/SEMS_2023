import { error } from "console"
import zod from "zod"
import { Response, Request, NextFunction } from "express"

export const errorHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const statusCode = res.statusCode !== 200 ? res.statusCode : 500
	res.status(statusCode)
	if (err instanceof zod.ZodError) res.send(err.issues)
	else res.send(err.message)
}
