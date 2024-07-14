'use client'
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'

import { CreateActivityForm } from '@/app/trips/[...id]/_components/create-activity-form'
import { ModalFormTemplate } from '@/components/modal-form-template'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'

interface CreateModalActivityProps {
  startAt: string
  endAt?: string
  tripId: string
}
export function CreateModalActivity({
  tripId,
  startAt,
  endAt,
}: CreateModalActivityProps) {
  const [open, setOpen] = useState<boolean>(false)

  function handleModal() {
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusIcon size={20} />
          Cadastrar atividade
        </Button>
      </DialogTrigger>
      <ModalFormTemplate
        title="Cadastrar atividade"
        description="Todos convidados podem visualizar as atividades."
      >
        <CreateActivityForm
          onClickSubmit={handleModal}
          tripId={tripId}
          startAt={startAt}
          endAt={endAt}
        />
      </ModalFormTemplate>
    </Dialog>
  )
}
