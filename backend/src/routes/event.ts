import express from "express"
import {
	createEventController,
	getEventController,
	getEventByIDController,
	updateOrganiserController,
	deleteEventController,
	getEventParticipationController,
} from "../controllers/eventController"

export const eventRouter = express.Router()

eventRouter.route("/").post(createEventController).get(getEventController)

// * Endpoint to get all the participants for an event
eventRouter.route("/:id/participants").get(getEventParticipationController)

eventRouter
	.route("/:id")
	.put(updateOrganiserController)
	.get(getEventByIDController)
	.delete(deleteEventController)
