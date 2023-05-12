import zod from "zod"

export const Discipline = zod.object({
	dis_name: zod.string(),
	school_uuid: zod.string().uuid(),
})

export const DisciplineWithUUID = Discipline.extend({
	dis_uuid: zod.string().uuid(),
})

export type Discipline = zod.infer<typeof Discipline>

export type DisciplineWithUUID = zod.infer<typeof DisciplineWithUUID>
