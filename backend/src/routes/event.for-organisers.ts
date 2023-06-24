import express from "express"
import {
	createEventController,
	deleteEventController,
	getEventByIDController,
	getEventParticipationController,
	getOrganiserEventController,
	updateEventController,
} from "../controllers/eventController.for-organisers"
import { EventWithJwt } from "../interfaces/event"
import { JwtToken } from "../interfaces/jwtToken"
import { OrganiserEventQueryParams } from "../interfaces/queryParams"
import { verifyJwtHandler } from "../middlewares/jwtHandler"
import { requestValidators } from "../middlewares/requestValidator"

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
