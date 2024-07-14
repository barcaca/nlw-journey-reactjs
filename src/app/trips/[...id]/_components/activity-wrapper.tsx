import { format } from 'date-fns/format'
import { ptBR } from 'date-fns/locale'
import { CircleCheckIcon, CircleDashedIcon } from 'lucide-react'

import { getActivities } from '@/lib/data/activities'

interface ActivityWrapperProps {
  tripId: string
}
export async function ActivityWrapper({ tripId }: ActivityWrapperProps) {
  const activities = await getActivities(tripId)

  return (
    <div className="space-y-8">
      {activities.map((activity) => {
        return (
          <div key={activity.date} className="space-y-2.5">
            <div className="flex items-baseline gap-2">
              <span className="text-lg">{format(activity.date, 'd')}</span>
              <span className="text-xs capitalize text-muted-foreground">
                {format(activity.date, 'EEEE', { locale: ptBR })}
              </span>
            </div>
            {activity.activities.length > 0 ? (
              <div className="space-y-2.5">
                {activity.activities.map((plan) => {
                  const hasPassed =
                    new Date(plan.occurs_at).getTime() < new Date().getTime()
                  return (
                    <div key={plan.id} className="space-y-2.5">
                      <div className="flex items-center gap-3 rounded-xl px-4 py-2.5 shadow-shape">
                        {hasPassed ? (
                          <CircleCheckIcon size={20} className="text-primary" />
                        ) : (
                          <CircleDashedIcon
                            size={20}
                            className="text-primary"
                          />
                        )}
                        <span>{plan.title}</span>
                        <span className="ml-auto text-sm text-muted-foreground">
                          {format(plan.occurs_at, 'HH:mm')} h
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Nenhuma atividade cadastrada nessa data.
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}
