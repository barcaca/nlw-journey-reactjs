import { ArrowRightIcon, MapIcon, Settings2Icon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

import { TCreateTripData } from '@/actions/trip/create/schema'
import { DatePickerWithRange } from '@/components/date-picker-with-range'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

interface StepOneDestinationDateProps {
  isGuestsInputOpen: boolean
  onGuestsInput: () => void
}

export function StepOneDestinationDate({
  onGuestsInput,
  isGuestsInputOpen,
}: StepOneDestinationDateProps) {
  const { control, watch } = useFormContext<TCreateTripData>()

  // Verificar se os campos estão preenchidos
  const destination = watch('destination')
  const fromDate = watch('date.from')

  const isFormIncomplete = !destination || !fromDate

  return (
    <div className="flex h-16 items-center gap-5 rounded-lg bg-background px-4 shadow-shape">
      <div className="flex h-full w-full items-center">
        <MapIcon size={20} className="text-primary" />
        <FormField
          control={control}
          name="destination"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="flex-1"
                  placeholder="Para onde você vai?"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      <DatePickerWithRange />
      <Separator orientation="vertical" className="h-6 bg-primary" />
      {isGuestsInputOpen ? (
        <Button
          type="button"
          className="gap-2"
          variant={'outline'}
          onClick={onGuestsInput}
        >
          Alterar Local/Data <Settings2Icon size={16} />
        </Button>
      ) : (
        <Button
          className="gap-2"
          type="button"
          onClick={onGuestsInput}
          disabled={isFormIncomplete}
        >
          Continuar <ArrowRightIcon size={16} />
        </Button>
      )}
    </div>
  )
}
