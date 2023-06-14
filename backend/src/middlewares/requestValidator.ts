import { Response, Request, NextFunction } from "express"
import zod from "zod"

export interface RequestValidators {
	params?: zod.AnyZodObject
	body?: zod.AnyZodObject
	query?: zod.AnyZodObject
}

export const requestValidators = (validators: RequestValidators) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			if (validators.params) {
				req.params = await validators.params.parseAsync(req.params)
			}
			if (validators.body) {
				req.body = await validators.body.parseAsync(req.body)
			}
			if (validators.query) {
				req.query = await validators.query.parseAsync(req.query)
			}
			next()
		} catch (error) {
			if (error instanceof zod.ZodError) {
				res.status(422) // sets the response status to 422 and error messages will be handled by the errorHandler
			}
			next(error)
		}
	}
}
