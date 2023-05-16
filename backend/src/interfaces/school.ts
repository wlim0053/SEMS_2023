import zod from "zod"

export const School = zod.object({
	school_name: zod.string().includes("School of"),
})

export const SchoolWithUUID = School.extend({
	school_uuid: zod.string().uuid(),
})

export type School = zod.infer<typeof School>

export type SchoolWithUUID = zod.infer<typeof SchoolWithUUID>
