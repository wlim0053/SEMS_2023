import express from "express"
import { getStudentEventController } from "../controllers/eventControllers.for-students"
import { StudentEventQueryParams } from "../interfaces/queryParams"
import { verifyJwtHandler } from "../middlewares/jwtHandler"
import { requestValidators } from "../middlewares/requestValidator"

export const studentEventRouter = express.Router()

// * Endpoint to fetch events for student page
studentEventRouter.get(
	"/",
	verifyJwtHandler(["A", "O", "S"]),
	requestValidators({ query: StudentEventQueryParams }),
	getStudentEventController
)
