import express from "express"
import {
	completeEventController,
	createEventController,
	deleteEventController,
	getEventByIDController,
	getEventParticipationController,
	getOrganiserEventController,
	updateEventController,
} from "../controllers/eventController.for-organiser"
import { EventWithJwt } from "../interfaces/event"
import { JwtToken } from "../interfaces/jwtToken"
import { OrganiserEventQueryParams } from "../interfaces/queryParams"
import { verifyJwtHandler } from "../middlewares/jwtHandler"
import { requestValidators } from "../middlewares/requestValidator"
import { requestForFeedbackEmail } from "../middlewares/emailHandler"
import { createEmailReminderController, createEmailForCertController } from "../controllers/emailController"


export const organiserEventRouter = express.Router()

organiserEventRouter
	.route("/")
	.post(
		verifyJwtHandler(["A", "O"]),
		requestValidators({ body: EventWithJwt }),
		createEventController
	)
	.get(
		verifyJwtHandler(["A", "O"]),
		requestValidators({ body: JwtToken, query: OrganiserEventQueryParams }),
		getOrganiserEventController
	)

organiserEventRouter.get(
	"/:id/participation",
	verifyJwtHandler(["A", "O"]),
	requestValidators({ body: JwtToken }),
	getEventParticipationController
)

organiserEventRouter.patch(
	"/:id/complete",
	verifyJwtHandler(["A", "O"]),
	completeEventController,
	requestForFeedbackEmail
)

organiserEventRouter
	.route("/:id")
	.get(
		verifyJwtHandler(["A", "O"]),
		requestValidators({ body: JwtToken }),
		getEventByIDController
	)
	.put(
		verifyJwtHandler(["A", "O"]),
		requestValidators({ body: EventWithJwt }),
		updateEventController
	)
	.delete(
		verifyJwtHandler(["A", "O"]),
		requestValidators({ body: JwtToken }),
		deleteEventController
	)

organiserEventRouter
	.route("/:id/reminder")
	.post(
		verifyJwtHandler(["A", "O"]),
		createEmailReminderController
	)

organiserEventRouter
	.route("/:id/cert")
	.post(
		verifyJwtHandler(["A", "O"]),
		createEmailForCertController
	)