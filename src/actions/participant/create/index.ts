/* eslint-disable camelcase */
'use server'

import { revalidatePath } from 'next/cache'

import {
  CreateParticipantSchema,
  TCreateParticipantData,
} from '@/actions/participant/create/schema'
import { BASE_URL, ENDPOINTS } from '@/lib/data/base'

export async function createParticipantAction(
  tripId: string,
  formData: TCreateParticipantData,
) {
  const validationFields = CreateParticipantSchema.safeParse(formData)
  if (!validationFields.success) {
    throw new Error('Invalid form data')
  }
  const { email } = validationFields.data

  const inviteData = {
    email,
  }
  try {
    const response = await fetch(
      `${BASE_URL.REST}${ENDPOINTS.TRIPS}/${tripId}${ENDPOINTS.INVITES}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inviteData),
      },
    )
    if (!response.ok) {
      throw new Error('Failed to invite')
    }

    revalidatePath(`${ENDPOINTS.TRIPS}/${tripId}`)
  } catch (error) {}
}
