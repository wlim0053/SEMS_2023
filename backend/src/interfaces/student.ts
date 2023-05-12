import zod from "zod"

export const Student = zod.object({
	stu_email: zod.string().email(),
	stu_name: zod.string(),
	stu_id: zod.number(),
	enrolment_year: zod.string().datetime(),
	enrolment_intake: zod.number(),
	stu_gender: zod.number(),
	dis_uuid: zod.string().uuid(),
})

export const StudentWithFireId = Student.extend({
	stu_fire_id: zod.string(),
})

export type Student = zod.infer<typeof Student>

export type StudentWithFireId = zod.infer<typeof StudentWithFireId>
