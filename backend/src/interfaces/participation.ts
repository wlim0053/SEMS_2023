import zod from "zod"
import { Event } from "./event"
import { JwtToken } from "./jwtToken"

// * Response body
export const Participation = zod.object({
	event_uuid: zod.string().uuid(),
	user_fire_id: zod.string().optional(),
	participation_attendance: zod
		.number()
		.refine((value) => value === 0 || value === 1, {
			message: "Invalid number. Expected 0 or 1.",
		})
		.optional(),
	participation_year: zod.number(),
	participation_semester: zod
		.number()
		.refine((value) => value === 1 || value === 2, {
			message: "Invalid number. Expected 1 or 2.",
		}),
})

export const ParticipationWithUUID = Participation.extend({
	participation_uuid: zod.string().uuid(),
})

export const ParticipationWithEvent = ParticipationWithUUID.merge(Event)

export type Participation = zod.infer<typeof Participation>

export type ParticipationWithUUID = zod.infer<typeof ParticipationWithUUID>

export type ParticipationWithEvent = zod.infer<typeof ParticipationWithEvent>

// * Request body
export const ParticipationWithJwt = Participation.omit({
	user_fire_id: true,
}).extend({ user: JwtToken })

export type ParticipationWithJwt = zod.infer<typeof ParticipationWithJwt>

// * Query params
export const ParticipationQueryParams = zod.object({
	event_status: zod.enum(["D", "P", "A", "R", "C"]).optional(),
})

export type ParticipationQueryParams = zod.infer<
	typeof ParticipationQueryParams
>
