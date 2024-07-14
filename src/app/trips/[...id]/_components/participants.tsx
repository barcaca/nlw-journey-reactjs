import { CheckCircle2, CircleDashedIcon } from 'lucide-react'

import { getParticipants } from '@/lib/data/participants'

import { CreateModalParticipant } from './create-modal-participants'

export async function Participants({ id }: { id: string }) {
  const guests = await getParticipants(id)
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Convidados</h2>
      <div className="space-y-5">
        {guests.map((guest, i) => {
          return (
            <div
              key={guest.id}
              className="flex items-center justify-between gap-4"
            >
              <div className="flex-1 space-y-1.5">
                <span className="block font-medium">
                  {guest.name ?? `Convidado ${i}`}
                </span>
                <span className="block truncate text-xs text-muted-foreground">
                  {guest.email}
                </span>
              </div>
              {guest.is_confirmed ? (
                <CheckCircle2 size={20} className="text-primary" />
              ) : (
                <CircleDashedIcon size={20} className="text-muted-foreground" />
              )}
            </div>
          )
        })}
      </div>
      <CreateModalParticipant tripId={id} />
    </div>
  )
}
