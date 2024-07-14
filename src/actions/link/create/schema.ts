import { z } from 'zod'

const FormSchema = z.object({
  title: z.string(),
  url: z.string().url(),
})

export const CreateLinkSchema = FormSchema

export type TCreateLinkData = z.infer<typeof CreateLinkSchema>
