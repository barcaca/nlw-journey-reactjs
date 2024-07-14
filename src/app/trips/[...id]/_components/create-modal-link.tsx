'use client'
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'

import { ModalFormTemplate } from '@/components/modal-form-template'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'

import { CreateLinkForm } from './create-link-form'
export function CreateModalLink({ tripId }: { tripId: string }) {
  const [open, setOpen] = useState<boolean>(false)

  function handleModal() {
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={'secondary'} className="w-full gap-2">
          <PlusIcon size={20} />
          Cadastrar novo Link
        </Button>
      </DialogTrigger>
      <ModalFormTemplate
        title="Cadastrar link"
        description="Todos convidados podem visualizar os links importantes."
      >
        <CreateLinkForm onClickSubmit={handleModal} tripId={tripId} />
      </ModalFormTemplate>
    </Dialog>
  )
}
