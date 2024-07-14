import { format } from 'date-fns/format'
import { ptBR } from 'date-fns/locale'
import { MailIcon, UserIcon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

import { TCreateTripData } from '@/actions/trip/create/schema'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

interface StepThreeOwnerProps {
  isOwnerInputOpen: boolean
  setIsOwnerInputOpen: (open: boolean) => void
  isPending: boolean
}

export function StepThreeOwner({
  isOwnerInputOpen,
  setIsOwnerInputOpen,
  isPending,
}: StepThreeOwnerProps) {
  const { getValues, control } = useFormContext<TCreateTripData>()
  const { destination, date } = getValues()

  const startAt = date.from
  const endAt = date.to

  return (
    <Dialog open={isOwnerInputOpen} onOpenChange={setIsOwnerInputOpen}>
      <DialogContent className="max-w-lg gap-5">
        <DialogHeader>
          <DialogTitle className="text-lg">
            Confirmar criação da viagem
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Para concluir a criação da viagem para{' '}
            <span className="font-semibold text-foreground">
              {destination}{' '}
            </span>{' '}
            nas datas de{' '}
            <span className="capitalize text-foreground">
              {startAt && <>{format(startAt, 'dd MMMM', { locale: ptBR })}</>} -{' '}
              {endAt && <>{format(endAt, 'dd MMMM', { locale: ptBR })}</>}{' '}
            </span>
            preencha seus dados abaixo:
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="w-full gap-5 sm:flex-col">
          <FormField
            control={control}
            name="owner_name"
            render={({ field }) => (
              <FormItem className="flex items-center rounded-lg border border-border px-3">
                <UserIcon size={20} className="text-primary" />
                <FormControl className="!m-0">
                  <Input
                    className="flex-1"
                    placeholder="Seu nome completo"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="owner_email"
            render={({ field }) => (
              <FormItem className="!m-0 flex items-center rounded-lg border border-border px-3">
                <MailIcon size={20} className="text-primary" />
                <FormControl className="!m-0">
                  <Input
                    className="flex-1"
                    placeholder="Seu email pessoal"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            form="trip"
            className="!m-0 w-full"
            disabled={isPending}
          >
            Confirmar criação da viagem
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
