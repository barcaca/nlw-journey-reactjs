import { cache } from 'react'

import { BASE_URL, ENDPOINTS } from '@/lib/data/base'
import { ParticipantResponse, Participants } from '@/types/participants'

export async function fetchParticipants(
  tripId: string,
): Promise<Participants[]> {
  const response = await fetch(
    `${BASE_URL.REST}${ENDPOINTS.TRIPS}/${tripId}${ENDPOINTS.PARTICIPANTS}`,
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
  const data: ParticipantResponse = await response.json()
  return data.participants
}

export const getParticipants = cache(fetchParticipants)
