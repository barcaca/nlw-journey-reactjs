import { z } from 'zod'

const FormSchema = z.object({
  destination: z.string().min(2),
  date: z.object({
    from: z.date(),
    to: z.date().optional(),
  }),
  emails_to_invite: z.array(z.string().email()),
  owner_name: z.string().min(2, {
    message: 'Nome é necessario',
  }),
  owner_email: z.string().email(),
})

export const CreateTripSchema = FormSchema

export type TCreateTripData = z.infer<typeof CreateTripSchema>
