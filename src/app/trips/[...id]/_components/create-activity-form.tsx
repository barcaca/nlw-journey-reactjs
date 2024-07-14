import { zodResolver } from '@hookform/resolvers/zod'
import { TagIcon } from 'lucide-react'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'

import { createActivityAction } from '@/actions/activity/create'
import {
  CreateActivitySchema,
  TCreateActivityData,
} from '@/actions/activity/create/schema'
import { DatePicker } from '@/components/date-picker'
import { TimePicker } from '@/components/time-picker'
import { Button } from '@/components/ui/button'
import { DialogFooter } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

interface CreateActivityFormProps {
  onClickSubmit: () => void
  tripId: string
  startAt: string
  endAt?: string
}

export function CreateActivityForm({
  tripId,
  onClickSubmit,
  startAt,
  endAt,
}: CreateActivityFormProps) {
  const [isPending, startTransition] = useTransition()
  const createActivityActionWithId = createActivityAction.bind(null, tripId)

  const defaultValues = {
    title: '',
    time: '',
    date: undefined,
  }

  const form = useForm<TCreateActivityData>({
    resolver: zodResolver(CreateActivitySchema),
    defaultValues,
  })

  async function onCreateActivity(formData: TCreateActivityData) {
    startTransition(() => {
      createActivityActionWithId(formData).then(() => {
        onClickSubmit()
        form.reset()
      })
    })
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onCreateActivity)}>
        <DialogFooter className="w-full gap-5 sm:flex-col">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="!m-0 flex items-center rounded-lg border border-border px-3">
                <TagIcon size={20} className="text-primary" />
                <FormControl className="!m-0">
                  <Input
                    className="flex-1"
                    placeholder="Qual a atividade?"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="!m-0 flex gap-2">
            <DatePicker startAt={startAt} endAt={endAt} />
            <TimePicker />
          </div>
          <Button type="submit" disabled={isPending} className="!m-0">
            Salvar atividade
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
