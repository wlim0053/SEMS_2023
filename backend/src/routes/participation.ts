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
	ParticipationQueryParams,
	ParticipationWithJwt,
} from "../interfaces/participation"
import { verifyJwtHandler } from "../middlewares/jwtHandler"
import { requestValidators } from "../middlewares/requestValidator"

export const participationRouter = express.Router()

participationRouter
	.route("/")
	.post(
		verifyJwtHandler(["S", "O", "A"]),
		requestValidators({ body: ParticipationWithJwt }),
		createParticipationController
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
