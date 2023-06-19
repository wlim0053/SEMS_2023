import zod from "zod"

export const Event = zod.object({
	event_ems_no: zod.string().nullable(),
	organiser_uuid: zod.string().uuid(),
	event_start_date: zod.string().datetime(),
	event_end_date: zod.string().datetime(),
	event_title: zod.string().nonempty(),
	event_desc: zod.string().nonempty(),
	event_mode: zod.enum(["P", "V", "H"]),
	event_venue: zod.string().nonempty(),
	event_capacity: zod.number().nonnegative(),
	event_status: zod.enum(["D", "P", "A", "R"]),
	event_reg_start_date: zod.string().datetime().nullable(),
	event_reg_end_date: zod.string().datetime().nullable(),
	event_reg_google_form: zod.string().url().nullable(),
})

export const EventWithUUID = Event.extend({
	event_uuid: zod.string().uuid(),
})

export const EventWithOrganiser = EventWithUUID.extend({
	parent_uuid: zod.string(),
	organiser_name: zod.string(),
	user_fire_id: zod.string(),
})

export type Event = zod.infer<typeof Event>

export type EventWithUUID = zod.infer<typeof EventWithUUID>

export type EventWithOrganiser = zod.infer<typeof EventWithOrganiser>
