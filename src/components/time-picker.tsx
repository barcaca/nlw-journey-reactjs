import { ClockIcon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

type TimeType = {
  value: string
  label: string
}

const timeData: TimeType[] = []

for (let hour = 8; hour <= 19; hour++) {
  const hourString = hour < 10 ? `0${hour}` : `${hour}`

  timeData.push({
    value: `${hourString}:00`,
    label: `${hourString}:00 ${hour < 12 ? 'AM' : 'PM'}`,
  })

  timeData.push({
    value: `${hourString}:30`,
    label: `${hourString}:30 ${hour < 12 ? 'AM' : 'PM'}`,
  })
}

export function TimePicker() {
  const { control } = useFormContext()
  return (
    <FormField
      control={control}
      name="time"
      render={({ field }) => (
        <FormItem className="!m-0 flex w-32 items-center gap-2 rounded-lg border border-border">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'ghost'}
                className="!m-0 w-full justify-start gap-2"
              >
                <ClockIcon size={20} className="text-primary" />
                {field.value ? (
                  <span>{field.value}</span>
                ) : (
                  <span>Horário</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-96">
              <FormControl className="!m-0">
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-3 items-center"
                >
                  {timeData.map((time) => {
                    return (
                      <FormItem key={time.value} className="mt-2">
                        <FormControl>
                          <RadioGroupItem
                            value={time.value}
                            className="peer hidden"
                          />
                        </FormControl>
                        <FormLabel className="cursor-pointer rounded-lg border border-primary px-4 py-2 text-center text-sm font-medium text-primary hover:bg-primary hover:text-foreground peer-aria-checked:bg-primary peer-aria-checked:text-foreground">
                          {time.label}
                        </FormLabel>
                      </FormItem>
                    )
                  })}
                </RadioGroup>
              </FormControl>
            </PopoverContent>
          </Popover>
        </FormItem>
      )}
    />
  )
}
