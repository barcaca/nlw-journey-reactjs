import {
  ArrowRightIcon,
  AtSignIcon,
  PlusIcon,
  UserRoundPlusIcon,
  XIcon,
} from 'lucide-react'
import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

interface StepTwoInviteGuestProps {
  emails: string[]
  onRemoveEmail: (email: string) => void
  onAddEmail: (email: string) => void
  onOwnerInput: () => void
}

export function StepTwoInviteGuest({
  emails,
  onRemoveEmail,
  onAddEmail,
  onOwnerInput,
}: StepTwoInviteGuestProps) {
  const [emailInput, setEmailInput] = useState<string>('')

  function handleAddEmail() {
    if (!emailInput || emails.includes(emailInput)) return
    if (emailInput.trim() !== '') {
      onAddEmail(emailInput.trim())
      setEmailInput('')
    }
  }

  return (
    <div className="flex h-16 items-center gap-5 rounded-lg bg-background px-4 shadow-shape">
      <Dialog>
        <DialogTrigger asChild className="m-0 p-0">
          <Button variant={'ghost'} className="w-full justify-normal gap-2">
            <UserRoundPlusIcon size={20} className="text-primary" />
            {emails.length > 0 ? (
              <span>{emails.length} pessoa(s) convidada(s)</span>
            ) : (
              <span>Quem estará na viagem?</span>
            )}
          </Button>
        </DialogTrigger>
        <Button
          onClick={onOwnerInput}
          type="button"
          className="gap-2"
          disabled={emails.length === 0}
        >
          Confirmar viagem <ArrowRightIcon size={20} />
        </Button>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Selecionar convidados</DialogTitle>
            <DialogDescription>
              Os convidados irão receber e-mails para confirmar a participação
              na viagem.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-wrap gap-2">
            {emails.map((email) => {
              return (
                <Badge key={email} variant={'outline'} className="gap-2">
                  {email}
                  <Button
                    type="button"
                    variant={'ghost'}
                    size={'icon'}
                    className="size-5"
                    onClick={() => onRemoveEmail(email)}
                  >
                    <XIcon size={16} className="text-destructive" />
                  </Button>
                </Badge>
              )
            })}
          </div>
          <Separator className="bg-primary" />
          <DialogFooter className="items-center rounded-lg border border-border px-4 py-2.5">
            <AtSignIcon size={20} className="text-primary" />
            <Input
              className="!m-0"
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
            />
            <Button onClick={handleAddEmail} type="button" className="gap-2">
              Convidar <PlusIcon size={20} />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
