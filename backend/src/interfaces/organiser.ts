import zod from "zod"

export const Organiser = zod.object({
	parent_uuid: zod.string().nullable(),
	organiser_name: zod.string().nonempty(),
	stu_fire_id: zod.string(),
})

export const OrganiserWithUUID = Organiser.extend({
	organiser_uuid: zod.string().uuid(),
})

export type Organiser = zod.infer<typeof Organiser>

export type OrganiserWithUUID = zod.infer<typeof OrganiserWithUUID>
