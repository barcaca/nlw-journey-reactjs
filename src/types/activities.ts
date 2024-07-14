export type Activities = {
  date: string
  activities: [
    {
      id: string
      title: string
      occurs_at: string
    },
  ]
}

export type ActivitiesAPIResponse = {
  activities: Activities[]
}

export type ActivitiesFormData = {
  occurs_at: string
  title: string
}

export type CreateActivityResponse = {
  activityId: string // UUID é uma string
}
