import { zodResolver } from '@hookform/resolvers/zod'
import { AtSignIcon } from 'lucide-react'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'

import { createParticipantAction } from '@/actions/participant/create'
import {
  CreateParticipantSchema,
  TCreateParticipantData,
} from '@/actions/participant/create/schema'
import { Button } from '@/components/ui/button'
import { DialogFooter } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

interface CreateParticipantFormProps {
  onClickSubmit: () => void
  tripId: string
}

export function CreateParticipantForm({
  onClickSubmit,
  tripId,
}: CreateParticipantFormProps) {
  const [isPending, startTransition] = useTransition()
  const createParticipantActionWithId = createParticipantAction.bind(
    null,
    tripId,
  )

  const defaultValues = {
    email: '',
  }

  const form = useForm<TCreateParticipantData>({
    resolver: zodResolver(CreateParticipantSchema),
    defaultValues,
  })

  async function onCreateParticipant(formData: TCreateParticipantData) {
    startTransition(() => {
      createParticipantActionWithId(formData).then(() => {
        onClickSubmit()
        form.reset()
      })
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onCreateParticipant)}>
        <DialogFooter className="w-full gap-5 sm:flex-col">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="!m-0 flex items-center rounded-lg border border-border px-3">
                <AtSignIcon size={20} className="text-primary" />
                <FormControl className="!m-0">
                  <Input
                    type="email"
                    className="flex-1"
                    placeholder="Digite o e-mail do convidado"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending} className="!m-0">
            Convidar
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
