/* eslint-disable camelcase */
'use server'

import { revalidatePath } from 'next/cache'

import { TUpdateTripData, UpdateTripSchema } from '@/actions/trip/update/schema'
import { BASE_URL, ENDPOINTS } from '@/lib/data/base'

export async function updateTripAction(
  tripId: string,
  formData: TUpdateTripData,
) {
  const validationFields = UpdateTripSchema.safeParse(formData)
  if (!validationFields.success) {
    throw new Error('Invalid form data')
  }
  const { date, destination } = validationFields.data
  const startAt = date.from.toISOString()
  const endAt = date.to?.toISOString()

  const tripData = {
    destination,
    starts_at: startAt,
    ends_at: endAt,
  }
  try {
    const response = await fetch(
      `${BASE_URL.REST}${ENDPOINTS.TRIPS}/${tripId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tripData),
      },
    )
    if (!response.ok) {
      throw new Error('Failed to create trip')
    }

    revalidatePath(`${ENDPOINTS.TRIPS}/${tripId}`)
  } catch (error) {}
}
