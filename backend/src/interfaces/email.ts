import zod from "zod"
import { EventWithOrganiser } from "./event"
import { UserWithFireId } from "./user"

export const CertificateDetails = UserWithFireId.merge(EventWithOrganiser)

export type CertificateDetails = zod.infer<typeof CertificateDetails>

export const CertificateCustomMessage = zod.object({
	organisedBy: zod.string().nonempty(),
})

export type CertificateCustomMessage = zod.infer<
	typeof CertificateCustomMessage
>
