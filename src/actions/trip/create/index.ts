/* eslint-disable camelcase */
'use server'

import { CreateTripSchema, TCreateTripData } from '@/actions/trip/create/schema'
import { BASE_URL, ENDPOINTS } from '@/lib/data/base'
import { CreateTripResponse } from '@/types/trip'

export async function createTripAction(formData: TCreateTripData) {
  const validationFields = CreateTripSchema.safeParse(formData)
  if (!validationFields.success) {
    throw new Error('Invalid form data')
  }
  const { date, destination, emails_to_invite, owner_email, owner_name } =
    validationFields.data
  const startAt = date.from.toISOString()
  const endAt = date.to?.toISOString()

  const tripData = {
    destination,
    starts_at: startAt,
    ends_at: endAt,
    emails_to_invite,
    owner_name,
    owner_email,
  }
  try {
    const response = await fetch(`${BASE_URL.REST}${ENDPOINTS.TRIPS}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tripData),
    })
    if (!response.ok) {
      throw new Error('Failed to create trip')
    }
    const data: CreateTripResponse = await response.json()

    const { tripId } = data

    await fetch(
      `${BASE_URL.REST}${ENDPOINTS.TRIPS}/${tripId}${ENDPOINTS.CONFIRM}`,
    )

    return tripId
  } catch (error) {}
}
