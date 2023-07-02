import express from "express"
import {
	getAttendeesCountBySchool,
	getEventCountByOrganiser,
	getGenderCountByEvent,
} from "../controllers/statsController"
import {
	EventCountByOrganiserQueryParams,
	StatsQueryParams,
} from "../interfaces/queryParams"
import { requestValidators } from "../middlewares/requestValidator"

export const statsRouter = express.Router()

/**
 * /api/stats/organiser/event-count
 * Query params:
 *      semester=true/false
 *      year=2023
 *      organiser=parent/child
 */
statsRouter.get(
	"/organiser/event-count",
	requestValidators({ query: EventCountByOrganiserQueryParams }),
	getEventCountByOrganiser
)

// /api/stats/school/attendance-count
// Query params:
//      year=2023
statsRouter.get(
	"/school/attendees-count",
	requestValidators({ query: StatsQueryParams }),
	getAttendeesCountBySchool
)

// /api/stats/event/gender-count
statsRouter.get(
	"/event/gender-count",
	requestValidators({ query: StatsQueryParams }),
	getGenderCountByEvent
)
