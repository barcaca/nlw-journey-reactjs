import { cache } from 'react'

import { BASE_URL, ENDPOINTS } from '@/lib/data/base'
import { TripDetails, TripsAPIResponse } from '@/types/trip'

export async function fetchTripDetails(tripId: string): Promise<TripDetails> {
  const response = await fetch(`${BASE_URL.REST}${ENDPOINTS.TRIPS}/${tripId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  const data: TripsAPIResponse = await response.json()

  return data.trip
}

export const getTripDetails = cache(fetchTripDetails)
