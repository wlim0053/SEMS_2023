import express from "express"
import {
	createParticipationController,
	updateParticipationController,
	getParticipationController,
	getParticipationByIdController,
	deleteParticipationController,
} from "../controllers/participationController"

export const participationRouter = express.Router()

participationRouter
	.route("/")
	.post(createParticipationController)
	.get(getParticipationController)

participationRouter
	.route("/:id")
	.put(updateParticipationController)
	.get(getParticipationByIdController)
	.delete(deleteParticipationController)
