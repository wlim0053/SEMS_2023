import express from "express"
import {
	approveEventController,
	getPendingEvents,
	rejectEventController,
} from "../controllers/eventController.for-admin"
import { Event } from "../interfaces/event"
import { verifyJwtHandler } from "../middlewares/jwtHandler"
import { requestValidators } from "../middlewares/requestValidator"
import { isEventApprovedEmail } from "../middlewares/emailHandler"

export const adminEventRouter = express.Router()

// * Endpoint to get PENDING events
adminEventRouter.get("/", verifyJwtHandler(["S"]), getPendingEvents)

// * Endpoint to approve events
adminEventRouter.patch(
	"/:id/approve",
	verifyJwtHandler(["A"]),
	requestValidators({
		body: Event.required().pick({
			event_ems_no: true,
			event_ems_link: true,
		}),
	}),
	approveEventController,
	(req, res, next) => {
		isEventApprovedEmail(req, res, next, true)
	}
)

// * Endpoint to reject events
adminEventRouter.patch(
	"/:id/reject",
	verifyJwtHandler(["A"]),
	rejectEventController,
	(req, res, next) => {
		isEventApprovedEmail(req, res, next, false)
	}
)
