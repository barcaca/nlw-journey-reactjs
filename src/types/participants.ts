export type Participants = {
  id: string
  name: string
  email: string
  is_confirmed: boolean
}

export interface ParticipantResponse {
  participants: Participants[]
}
