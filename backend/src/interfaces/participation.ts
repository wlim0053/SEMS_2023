import zod from "zod"
import { Event } from "./event"
import { JwtToken } from "./jwtToken"
import { Organiser } from "./organiser"

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
	feedback_uuid: zod.string().uuid().nullish(),
})

export const ParticipationWithUUID = Participation.extend({
	participation_uuid: zod.string().uuid(),
})

export const ParticipationWithEventOrganiser = ParticipationWithUUID.merge(
	Event
).merge(Organiser.pick({ parent_uuid: true, organiser_name: true }))

export type Participation = zod.infer<typeof Participation>

export type ParticipationWithUUID = zod.infer<typeof ParticipationWithUUID>

export type ParticipationWithEventOrganiser = zod.infer<
	typeof ParticipationWithEventOrganiser
>

// * Request body
export const ParticipationWithJwt = Participation.omit({
	user_fire_id: true,
}).merge(JwtToken)

export type ParticipationWithJwt = zod.infer<typeof ParticipationWithJwt>
