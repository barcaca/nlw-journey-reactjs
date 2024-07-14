import { ActivityWrapper } from '@/app/trips/[...id]/_components/activity-wrapper'
import { HeaderTrips } from '@/app/trips/[...id]/_components/header-trips'
import { ImportantLinks } from '@/app/trips/[...id]/_components/important-links'
import { Separator } from '@/components/ui/separator'
import { getTripDetails } from '@/lib/data/trip'

import { CreateModalActivity } from './_components/create-modal-activity'
import { Participants } from './_components/participants'

export default async function TripIdPage({
  params,
}: {
  params: { id: string }
}) {
  const id = params.id
  const trip = await getTripDetails(id)
  return (
    <div className="mx-auto h-full w-full max-w-6xl space-y-8 px-6 py-10">
      <HeaderTrips
        destination={trip.destination}
        startAt={trip.starts_at}
        endAt={trip.ends_at}
        tripId={id}
      />
      <main className="flex gap-16 px-4">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl">Atividades</h2>
            <CreateModalActivity
              tripId={id}
              startAt={trip.starts_at}
              endAt={trip.ends_at}
            />
          </div>
          <ActivityWrapper tripId={id} />
        </div>
        <div className="w-80 space-y-6">
          <ImportantLinks tripId={id} />
          <Separator className="bg-primary" />
          <Participants id={id} />
        </div>
      </main>
    </div>
  )
}
