/* eslint-disable camelcase */
'use server'

import { format } from 'date-fns'
import { revalidatePath } from 'next/cache'

import {
  CreateActivitySchema,
  TCreateActivityData,
} from '@/actions/activity/create/schema'
import { BASE_URL, ENDPOINTS } from '@/lib/data/base'
import { CreateActivityResponse } from '@/types/activities'

export async function createActivityAction(
  tripId: string,
  formData: TCreateActivityData,
) {
  const validationFields = CreateActivitySchema.safeParse(formData)
  if (!validationFields.success) {
    throw new Error('Invalid form data')
  }
  const { title, time, date } = validationFields.data

  // TODO: convert date to string
  const dateConvert = format(date, 'yyyy-MM-dd')

  const occursAt = `${dateConvert}T${time}`
  console.log(occursAt)

  const activityData = {
    title,
    occurs_at: occursAt,
  }
  try {
    const response = await fetch(
      `${BASE_URL.REST}${ENDPOINTS.TRIPS}/${tripId}${ENDPOINTS.ACTIVITIES}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(activityData),
      },
    )
    if (!response.ok) {
      throw new Error('Failed to create activity')
    }
    const data: CreateActivityResponse = await response.json()

    const { activityId } = data
    revalidatePath(`${ENDPOINTS.TRIPS}/${tripId}`)
    return activityId
  } catch (error) {}
}
