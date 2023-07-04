import zod from "zod"
import { JwtToken } from "./jwtToken"
import { Organiser } from "./organiser"
import { User } from "./user"

// * Response body
export const Event = zod.object({
	event_ems_no: zod.string().nullable(),
	event_ems_link: zod.string().url().nullable(),
	organiser_uuid: zod.string().uuid(),
	event_start_date: zod.string().datetime(),
	event_end_date: zod.string().datetime(),
	event_title: zod.string().nonempty(),
	event_desc: zod.string().nonempty(),
	event_mode: zod.enum(["P", "V", "H"]),
	event_venue: zod.string().nonempty(),
	event_capacity: zod.number().nonnegative(),
	event_status: zod.enum(["D", "P", "A", "R", "C"]),
	event_reg_start_date: zod.string().datetime().nullable(),
	event_reg_end_date: zod.string().datetime().nullable(),
	event_reg_google_form: zod.string().url().nullable(),
})

export const EventWithUUID = Event.extend({
	event_uuid: zod.string().uuid(),
})

export const EventWithOrganiser = EventWithUUID.merge(
	Organiser.pick({
		parent_uuid: true,
		organiser_name: true,
		user_fire_id: true,
	})
)

export const EventWithUser = EventWithUUID.merge(User)

export const EventWithOrganiserUser = EventWithUUID.merge(User).merge(Organiser)

export type Event = zod.infer<typeof Event>

export type EventWithUUID = zod.infer<typeof EventWithUUID>

export type EventWithOrganiser = zod.infer<typeof EventWithOrganiser>

// * Request body
export const EventWithJwt = Event.omit({
	organiser_uuid: true,
}).merge(JwtToken)

export type EventWithJwt = zod.infer<typeof EventWithJwt>

export type EventWithUser = zod.infer<typeof EventWithUser>

export type EventWithOrganiserUser = zod.infer<typeof EventWithOrganiserUser>