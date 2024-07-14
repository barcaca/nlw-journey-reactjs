import { cache } from 'react'

import { BASE_URL, ENDPOINTS } from '@/lib/data/base'
import { Activities, ActivitiesAPIResponse } from '@/types/activities'

export async function fetchActivities(tripId: string): Promise<Activities[]> {
  const response = await fetch(
    `${BASE_URL.REST}${ENDPOINTS.TRIPS}/${tripId}${ENDPOINTS.ACTIVITIES}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  const data: ActivitiesAPIResponse = await response.json()
  return data.activities
}

export const getActivities = cache(fetchActivities)
