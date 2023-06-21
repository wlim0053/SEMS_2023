import zod from "zod"

export const Participation = zod.object({
	event_uuid: zod.string().uuid(),
	user_fire_id: zod.string(),
	participation_attendance: zod
		.number()
		.refine((value) => value === 0 || value === 1, {
			message: "Invalid number. Expected 0 or 1.",
		}),
})

export const ParticipationWithUUID = Participation.extend({
	participation_uuid: zod.string().uuid(),
})

export type Participation = zod.infer<typeof Participation>

export type ParticipationWithUUID = zod.infer<typeof ParticipationWithUUID>
