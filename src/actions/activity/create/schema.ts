import { z } from 'zod'

const FormSchema = z.object({
  title: z.string(),
  time: z.string(),
  date: z.date(),
})

export const CreateActivitySchema = FormSchema

export type TCreateActivityData = z.infer<typeof CreateActivitySchema>
