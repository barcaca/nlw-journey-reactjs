import { z } from 'zod'

const FormSchema = z.object({
  email: z.string().email(),
})

export const CreateParticipantSchema = FormSchema

export type TCreateParticipantData = z.infer<typeof CreateParticipantSchema>
