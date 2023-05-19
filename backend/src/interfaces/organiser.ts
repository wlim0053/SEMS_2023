import zod from "zod"

export const Organiser = zod.object({
	parent_uuid: zod.string().uuid().nullable(),
	organiser_name: zod.string().nonempty(),
	stu_fire_id: zod.string(),
})

export const OrganiserWithUUID = Organiser.extend({
	organiser_uuid: zod.string().uuid(),
})

export const OrganiserWithStudent = OrganiserWithUUID.extend({
	stu_email: zod.string().email(),
	stu_name: zod.string(),
	stu_id: zod.number(),
	enrolment_year: zod.string().datetime(),
	enrolment_intake: zod.number(),
	stu_gender: zod.number(),
	spec_uuid: zod.string().uuid(),
})

export type Organiser = zod.infer<typeof Organiser>

export type OrganiserWithUUID = zod.infer<typeof OrganiserWithUUID>

export type OrganiserWithStudent = zod.infer<typeof OrganiserWithStudent>
