'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { MapPinIcon } from 'lucide-react'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'

import { updateTripAction } from '@/actions/trip/update'
import { TUpdateTripData, UpdateTripSchema } from '@/actions/trip/update/schema'
import { DatePickerWithRange } from '@/components/date-picker-with-range'
import { Button } from '@/components/ui/button'
import { DialogFooter } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

interface UpdateTripFormProps {
  destination: string
  startAt: string
  endAt?: string
  tripId: string
  onClose: () => void
}

export function UpdateTripForm({
  tripId,
  destination,
  startAt,
  endAt,
  onClose,
}: UpdateTripFormProps) {
  const updateTripWithId = updateTripAction.bind(null, tripId)
  const [isPending, startTransition] = useTransition()

  const defaultValues = {
    destination,
    date: {
      from: new Date(startAt),
      to: endAt ? new Date(endAt) : undefined,
    },
  }
  const form = useForm<TUpdateTripData>({
    resolver: zodResolver(UpdateTripSchema),
    defaultValues,
  })

  async function onUpdateTrip(formData: TUpdateTripData) {
    startTransition(() => {
      updateTripWithId(formData).then(() => {
        onClose()
        form.reset()
      })
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onUpdateTrip)}>
        <DialogFooter className="w-full gap-5 sm:flex-col">
          <FormField
            control={form.control}
            name="destination"
            render={({ field }) => (
              <FormItem className="!m-0 flex items-center rounded-lg border border-border px-3">
                <MapPinIcon size={20} className="text-primary" />
                <FormControl className="!m-0">
                  <Input
                    className="flex-1"
                    placeholder="Qual novo destino?"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="!m-0 flex max-w-min rounded-lg border border-border">
            <DatePickerWithRange />
          </div>

          <Button type="submit" disabled={isPending} className="!m-0">
            Salvar novo local/data
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
