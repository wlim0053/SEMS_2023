import zod from "zod"

export const Event = zod.object({
	event_ems_no: zod.string().nullable(),
	organiser_uuid: zod.string().uuid(),
	event_start_date: zod.string().datetime(),
	event_end_date: zod.string().datetime(),
	event_title: zod.string().nonempty(),
	event_desc: zod.string().nonempty(),
	event_venue: zod.string().nonempty(),
	event_capacity: zod.number().nonnegative(),
	event_status: zod.string(),
})

export const EventWithUUID = Event.extend({
	event_uuid: zod.string().uuid(),
})

export type Event = zod.infer<typeof Event>

export type EventWithUUID = zod.infer<typeof EventWithUUID>
