import zod from "zod"

export const Student = zod.object({
	spec_uuid: zod.string().uuid(),
	stu_email: zod.string().email(),
	stu_name: zod.string(),
	stu_id: zod.number(),
	stu_gender: zod.number(),
	enrolment_year: zod.string().datetime(),
	enrolment_intake: zod.number(),
})

export const StudentWithFireId = Student.extend({
	stu_fire_id: zod.string(),
})

export type Student = zod.infer<typeof Student>

export type StudentWithFireId = zod.infer<typeof StudentWithFireId>
