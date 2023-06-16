import zod from "zod"

// * Query Params
export const StatsQueryParams = zod.object({
	year: zod.string(),
})

export const EventCountByOrganiserQueryParams = StatsQueryParams.extend({
	semester: zod.enum(["true", "false"]).optional(),
	organiser: zod.enum(["parent", "child"]),
})

export type StatsQueryParams = zod.infer<typeof StatsQueryParams>

export type EventCountByOrganiserQueryParams = zod.infer<
	typeof EventCountByOrganiserQueryParams
>

// * Stats response body
export const EventCountByOrganiser = zod.object({
	organiser_name: zod.string(),
	year: zod.number(),
	sem: zod.string().optional(),
	event_count: zod.number(),
})

export const AttendeesCountBySchool = zod.object({
	school_name: zod.string(),
	spec_level: zod.string(),
	spec_name: zod.string(),
	no_attendees: zod.number(),
})

export const GenderCountByEvent = zod.object({
	year: zod.string(),
	school_name: zod.string(),
	spec_level: zod.string(),
	spec_name: zod.string(),
	no_attendess: zod.number(),
})

export type EventCountByOrganiser = zod.infer<typeof EventCountByOrganiser>

export type AttendeesCountBySchool = zod.infer<typeof AttendeesCountBySchool>

export type GenderCountByEvent = zod.infer<typeof GenderCountByEvent>
