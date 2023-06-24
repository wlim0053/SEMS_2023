import zod from "zod"

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
