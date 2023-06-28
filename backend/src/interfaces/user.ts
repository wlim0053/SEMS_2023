import zod from "zod"

export const User = zod.object({
	spec_uuid: zod.string().uuid(),
	user_email: zod.string().email(),
	user_fname: zod.string(),
	user_lname: zod.string(),
	user_id: zod.number(),
	user_gender: zod.number().refine((value) => value === 0 || value === 1, {
		message: "Invalid number. Expected 0 or 1.",
	}),
	user_enrolment_year: zod.number(),
	user_enrolment_semester: zod
		.number()
		.refine((value) => value === 2 || value === 7 || value === 10, {
			message: "Invalid number. Expected 2, 7 or 10.",
		}),
	user_access_lvl: zod.enum(["A", "O", "S"]).optional(),
})

export const UserWithFireId = User.extend({
	user_fire_id: zod.string(),
})

export const UserLogin = UserWithFireId.pick({ user_fire_id: true })

export type User = zod.infer<typeof User>

export type UserWithFireId = zod.infer<typeof UserWithFireId>

export type UserLogin = zod.infer<typeof UserLogin>
