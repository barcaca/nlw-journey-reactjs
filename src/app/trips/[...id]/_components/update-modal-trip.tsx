'use client'
import { Settings2Icon } from 'lucide-react'
import { useState } from 'react'

import { ModalFormTemplate } from '@/components/modal-form-template'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'

import { UpdateTripForm } from './update-trip-form'

interface UpdateModalTripProps {
  destination: string
  startAt: string
  endAt?: string
  tripId: string
}

export function UpdateModalTrip({
  tripId,
  destination,
  startAt,
  endAt,
}: UpdateModalTripProps) {
  const [open, setOpen] = useState<boolean>(false)

  function handleModal() {
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          className="gap-2 border-primary"
          variant={'outline'}
        >
          Alterar Local/Data <Settings2Icon size={16} />
        </Button>
      </DialogTrigger>
      <ModalFormTemplate
        title="Mudar Local/Data"
        description="Mude o local ou data de destino"
      >
        <UpdateTripForm
          tripId={tripId}
          destination={destination}
          startAt={startAt}
          endAt={endAt}
          onClose={handleModal}
        />
      </ModalFormTemplate>
    </Dialog>
  )
}
