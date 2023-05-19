import zod from "zod"

export const Specialisation = zod.object({
	school_uuid: zod.string().uuid(),
	spec_level: zod.enum(["UG", "PG"]),
	spec_name: zod.string(),
})

export const SpecialisationWithUUID = Specialisation.extend({
	spec_uuid: zod.string().uuid(),
})

export type Specialisation = zod.infer<typeof Specialisation>

export type SpecialisationWithUUID = zod.infer<typeof SpecialisationWithUUID>
