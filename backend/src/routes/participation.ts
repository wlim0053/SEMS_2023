import express from "express"
import {
	createParticipationController,
	markParticipationAttendanceController,
	getParticipationController,
	// getParticipationByIdController,
	// deleteParticipationController,
} from "../controllers/participationController"
import {
	Participation,
	ParticipationWithJwt,
} from "../interfaces/participation"
import { ParticipationQueryParams } from "../interfaces/queryParams"
import { verifyJwtHandler } from "../middlewares/jwtHandler"
import { requestValidators } from "../middlewares/requestValidator"
import { registrationEmail } from "../middlewares/emailHandler"

export const participationRouter = express.Router()

participationRouter
	.route("/")
	.post(
		verifyJwtHandler(["S", "O", "A"]),
		requestValidators({ body: ParticipationWithJwt }),
		createParticipationController, 
		registrationEmail
	)
	.get(
		verifyJwtHandler(["S", "O", "A"]),
		requestValidators({ query: ParticipationQueryParams }),
		getParticipationController
	)

participationRouter.route("/:id/attendance").patch(
	verifyJwtHandler(["O", "A"]),
	requestValidators({
		body: Participation.pick({ participation_attendance: true }),
	}),
	markParticipationAttendanceController
)
