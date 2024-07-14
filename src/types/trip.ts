export type TripDetails = {
  id: string
  destination: string
  starts_at: string
  ends_at: string | undefined
  is_confirmed: boolean
}

export type TripData = {
  destination: string
  starts_at: string // should be in date-time format according to RFC 3339
  ends_at: string // should be in date-time format according to RFC 3339
  emails_to_invite: string[]
  owner_name: string
  owner_email: string
}

export type TripsAPIResponse = {
  trip: TripDetails
}

export type CreateTripResponse = {
  tripId: string // UUID é uma string
}
