import { CalendarIcon, MapPinIcon } from 'lucide-react'

import { Separator } from '@/components/ui/separator'
import { formatDate } from '@/lib/utils'

import { UpdateModalTrip } from './update-modal-trip'

interface HeaderTripsProps {
  destination: string
  startAt: string
  endAt?: string
  tripId: string
}
export function HeaderTrips({
  destination,
  startAt,
  endAt,
  tripId,
}: HeaderTripsProps) {
  return (
    <div className="flex h-16 w-full items-center justify-between rounded-xl bg-secondary px-4 shadow-shape">
      <div className="flex items-center gap-2">
        <MapPinIcon size={20} className="text-primary" />
        <span className="text-lg">{destination}</span>
      </div>
      <div className="flex items-center gap-2">
        <CalendarIcon size={20} className="text-primary" />
        <span className="text-lg capitalize">
          {formatDate(startAt)}
          {endAt && <> - {formatDate(endAt)}</>}
        </span>
        <Separator orientation="vertical" className="h-6 bg-primary" />
        <UpdateModalTrip
          tripId={tripId}
          destination={destination}
          startAt={startAt}
          endAt={endAt}
        />
      </div>
    </div>
  )
}
