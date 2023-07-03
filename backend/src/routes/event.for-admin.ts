import express from "express"
import {
	approveEventController,
	rejectEventController,
} from "../controllers/eventController.for-admin"
import { Event } from "../interfaces/event"
import { verifyJwtHandler } from "../middlewares/jwtHandler"
import { requestValidators } from "../middlewares/requestValidator"

export const adminEventRouter = express.Router()

// * Endpoint to change event status
adminEventRouter.patch(
	"/:id/approve",
	verifyJwtHandler(["A"]),
	requestValidators({
		body: Event.required().pick({
			event_ems_no: true,
			event_ems_link: true,
		}),
	}),
	approveEventController
)

adminEventRouter.patch(
	"/:id/reject",
	verifyJwtHandler(["A"]),
	rejectEventController
)