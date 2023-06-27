import zod from "zod"
import { Event } from "./event"

// * Stats Query Params
export const StatsQueryParams = zod
	.object({
		year: zod.string(),
	})
	.strict()

export const EventCountByOrganiserQueryParams = StatsQueryParams.extend({
	semester: zod.enum(["true", "false"]).optional(),
	organiser: zod.enum(["parent", "child"]),
}).strict()

export type StatsQueryParams = zod.infer<typeof StatsQueryParams>

export type EventCountByOrganiserQueryParams = zod.infer<
	typeof EventCountByOrganiserQueryParams
>

// * Student Event Status Query Params
export const ParticipationQueryParams = zod
	.object({
		event_status: zod.enum(["A", "C"]),
	})
	.strict()

export type ParticipationQueryParams = zod.infer<
	typeof ParticipationQueryParams
>

// * Student Event Status Query Params
export const StudentEventQueryParams = zod
	.object({
		event_status: zod.enum(["A", "C"]),
	})
	.strict()

export type StudentEventQueryParams = zod.infer<typeof StudentEventQueryParams>

// * Organiser Event Status Query Params
export const OrganiserEventQueryParams = zod
	.object({
		event_status: zod.enum(["D", "P", "A", "R", "C"]).optional(),
	})
	.strict()

export type OrganiserEventQueryParams = zod.infer<
	typeof OrganiserEventQueryParams
>

// * Admin Organiser Parent Query Params
export const AdminOrganiserQueryParams = zod
	.object({
		parent_uuid: zod.enum(["null"]).optional(),
	})
	.strict()

export type AdminOrganiserQueryParams = zod.infer<
	typeof AdminOrganiserQueryParams
>
