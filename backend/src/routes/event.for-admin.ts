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
// TODO: rememeber to change access level back to admin
adminEventRouter.patch(
	"/:id/approve",
	verifyJwtHandler(["S"]),
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
	verifyJwtHandler(["S"]),
	rejectEventController
)
