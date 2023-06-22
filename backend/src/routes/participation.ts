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
} from "../interfaces/participation"
import { requestValidators } from "../middlewares/requestValidator"

export const participationRouter = express.Router()

participationRouter
	.route("/")
	.post(
		requestValidators({ body: Participation }),
		createParticipationController
	)
	.get(
		requestValidators({ query: ParticipationQueryParams }),
		getParticipationController
	)

participationRouter.route("/:id/attendance").patch(
	requestValidators({
		body: Participation.pick({ participation_attendance: true }),
	}),
	markParticipationAttendanceController
)
// .get(getParticipationByIdController)
// .delete(deleteParticipationController)
