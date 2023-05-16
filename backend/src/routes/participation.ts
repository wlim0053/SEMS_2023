import express from "express"
import {
	createParticipationController,
	updateParticipationController,
	getParticipationController,
	getParticipationByIdController,
	deleteParticipationController,
} from "../controllers/participationController"
import { Participation } from "../interfaces/participation"
import { requestValidators } from "../middlewares/requestValidator"

export const participationRouter = express.Router()

participationRouter
	.route("/")
	.post(
		requestValidators({ body: Participation }),
		createParticipationController
	)
	.get(getParticipationController)

participationRouter
	.route("/:id")
	.put(
		requestValidators({ body: Participation }),
		updateParticipationController
	)
	.get(getParticipationByIdController)
	.delete(deleteParticipationController)
