import zod from "zod"

export const Feedback = zod.object({
	participation_uuid: zod.string().uuid(),
	feedback_comm: zod.number().nonnegative(),
	feedback_proj: zod.number().nonnegative(),
	feedback_solve: zod.number().nonnegative(),
	feedback_teamwork: zod.number().nonnegative(),
	feedback_reflection: zod.string().nonempty(),
})

export const FeedbackWithUUID = Feedback.extend({
	feedback_uuid: zod.string().uuid(),
})

export const FeedbackWithParticipation = FeedbackWithUUID.extend({
	event_uuid: zod.string().uuid(),
	user_fire_id: zod.string(),
})

export type Feedback = zod.infer<typeof Feedback>

export type FeedbackWithUUID = zod.infer<typeof FeedbackWithUUID>

export type FeedbackWithParticipation = zod.infer<
	typeof FeedbackWithParticipation
>
