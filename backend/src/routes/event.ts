import express from "express"
import {
	createEventController,
	getEventController,
	getEventByIDController,
	updateEventController,
	deleteEventController,
	getEventParticipationController,
} from "../controllers/eventController"
import { Event } from "../interfaces/event"
import { requestValidators } from "../middlewares/requestValidator"

export const eventRouter = express.Router()

eventRouter.route("/").post(createEventController).get(getEventController)

// * Endpoint to get all the participants for an event
eventRouter.route("/:id/participation").get(getEventParticipationController)

eventRouter
	.route("/:id")
	.put(updateEventController)
	.put(requestValidators({ body: Event }), updateEventController)
	.get(getEventByIDController)
	.delete(deleteEventController)
