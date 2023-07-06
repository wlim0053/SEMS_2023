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
import {
	createEmailReminderController,
	createEmailForCertController,
	requestForFeedbackEmail,
} from "../controllers/emailController"
import { CertificateCustomMessage } from "../interfaces/email"

export const organiserEventRouter = express.Router()

// * Organisers POST & GET events
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

// * Organisers views the participation for the event
organiserEventRouter.get(
	"/:id/participation",
	verifyJwtHandler(["A", "O"]),
	requestValidators({ body: JwtToken }),
	getEventParticipationController
)

// * Organisers marking event as complete -> send REQUEST FOR FEEDBACK EMAIL
organiserEventRouter.patch(
	"/:id/complete",
	verifyJwtHandler(["A", "O"]),
	completeEventController,
	requestForFeedbackEmail
)

// * Organiser send REMINDER EMAIL
organiserEventRouter
	.route("/:id/reminder")
	.post(
		verifyJwtHandler(["A", "O"]),
		requestValidators({ body: CertificateCustomMessage }),
		createEmailReminderController
	)

// * Organiser send CERTIFICATE EMAIL
organiserEventRouter
	.route("/:id/cert")
	.post(verifyJwtHandler(["A", "O"]), createEmailForCertController)

// * Organisers PUT, GET & DELETE by event_uuid
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
