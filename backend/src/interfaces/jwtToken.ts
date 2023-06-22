import zod from "zod"

export const JwtToken = zod.object({
	user_fire_id: zod.string(),
	user_access_lvl: zod.enum(["S", "O", "A"]),
	user_email: zod.string().email(),
	iat: zod.number(),
	exp: zod.number().optional(),
})

export type JwtToken = zod.infer<typeof JwtToken>
