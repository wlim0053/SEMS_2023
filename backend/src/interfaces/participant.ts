import zod from "zod"

export const Participant = zod.object({
	event_uuid: zod.string().uuid(),
	stu_fire_id: zod.string(),
})

export const ParticipantWithUUID = Participant.extend({
	participant_uuid: zod.string().uuid(),
})

export type Participant = zod.infer<typeof Participant>

export type ParticipantWithUUID = zod.infer<typeof ParticipantWithUUID>
