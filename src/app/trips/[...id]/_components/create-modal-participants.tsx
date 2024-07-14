'use client'
import { UserCogIcon } from 'lucide-react'
import { useState } from 'react'

import { ModalFormTemplate } from '@/components/modal-form-template'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'

import { CreateParticipantForm } from './create-participant-form'
export function CreateModalParticipant({ tripId }: { tripId: string }) {
  const [open, setOpen] = useState<boolean>(false)

  function handleModal() {
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={'secondary'} className="w-full gap-2">
          <UserCogIcon size={20} />
          Gerenciar convidados
        </Button>
      </DialogTrigger>
      <ModalFormTemplate
        title="Selecionar convidados"
        description="Todos convidados podem visualizar os links importantes."
      >
        <CreateParticipantForm onClickSubmit={handleModal} tripId={tripId} />
      </ModalFormTemplate>
    </Dialog>
  )
}
