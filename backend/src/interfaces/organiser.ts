import zod from "zod"
import { User } from "./user"

export const Organiser = zod.object({
	parent_uuid: zod.string().uuid().nullable(),
	organiser_name: zod.string().nonempty(),
	user_fire_id: zod.string(),
})

export const OrganiserWithUUID = Organiser.extend({
	organiser_uuid: zod.string().uuid(),
})

export const OrganiserWithStudent = OrganiserWithUUID.merge(User)

export type Organiser = zod.infer<typeof Organiser>

export type OrganiserWithUUID = zod.infer<typeof OrganiserWithUUID>

export type OrganiserWithStudent = zod.infer<typeof OrganiserWithStudent>
