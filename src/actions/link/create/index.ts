/* eslint-disable camelcase */
'use server'

import { revalidatePath } from 'next/cache'

import { CreateLinkSchema, TCreateLinkData } from '@/actions/link/create/schema'
import { BASE_URL, ENDPOINTS } from '@/lib/data/base'
import { CreateLinkResponse } from '@/types/links'

export async function createLinkAction(
  tripId: string,
  formData: TCreateLinkData,
) {
  const validationFields = CreateLinkSchema.safeParse(formData)
  if (!validationFields.success) {
    throw new Error('Invalid form data')
  }
  const { title, url } = validationFields.data

  const linkData = {
    title,
    url,
  }
  try {
    const response = await fetch(
      `${BASE_URL.REST}${ENDPOINTS.TRIPS}/${tripId}${ENDPOINTS.LINKS}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(linkData),
      },
    )
    if (!response.ok) {
      throw new Error('Failed to create link')
    }
    const data: CreateLinkResponse = await response.json()

    const { linkId } = data
    revalidatePath(`${ENDPOINTS.TRIPS}/${tripId}`)
    return linkId
  } catch (error) {}
}
