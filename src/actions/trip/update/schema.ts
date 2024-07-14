import { z } from 'zod'

const FormSchema = z.object({
  destination: z.string().min(2),
  date: z.object({
    from: z.date(),
    to: z.date().optional(),
  }),
})

export const UpdateTripSchema = FormSchema

export type TUpdateTripData = z.infer<typeof UpdateTripSchema>
