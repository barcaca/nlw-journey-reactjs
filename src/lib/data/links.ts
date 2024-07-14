import { cache } from 'react'

import { BASE_URL, ENDPOINTS } from '@/lib/data/base'
import { Link, LinksAPIResponse } from '@/types/links'

export async function fetchLinks(tripId: string): Promise<Link[]> {
  const response = await fetch(
    `${BASE_URL.REST}${ENDPOINTS.TRIPS}/${tripId}${ENDPOINTS.LINKS}`,
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
  const data: LinksAPIResponse = await response.json()
  return data.links
}

export const getLinks = cache(fetchLinks)
