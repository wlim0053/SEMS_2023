import express from "express"
import {
	createEventController,
	getEventController,
	getEventByIDController,
	updateOrganiserController,
	deleteEventController,
} from "../controllers/eventController"

export const eventRouter = express.Router()

eventRouter
	.route("/")
	.post(createEventController)
	.get(getEventController)

    eventRouter
	.route("/:id")
	.put(updateOrganiserController)
	.get(getEventByIDController)
	.delete(deleteEventController)
