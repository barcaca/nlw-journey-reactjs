import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { FormControl, FormField, FormItem } from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface DatePickerProps {
  startAt: string
  endAt?: string
}

export function DatePicker({ startAt, endAt }: DatePickerProps) {
  const { control } = useFormContext()
  const startDate = parseISO(startAt)
  const endDate = endAt ? parseISO(endAt) : undefined
  return (
    <FormField
      control={control}
      name="date"
      render={({ field }) => (
        <FormItem className="!m-0 flex flex-1 items-center rounded-lg border border-border">
          <div className={cn('grid w-full gap-2')}>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl className="">
                  <Button
                    id="date"
                    variant={'ghost'}
                    className={cn(
                      '!m-0 justify-start px-3 text-left font-normal',
                      !field && 'text-muted-foreground',
                    )}
                  >
                    <CalendarIcon size={20} className="mr-2 text-primary" />
                    {field.value ? (
                      <>
                        {format(field.value, 'dd MMMM yyyy', {
                          locale: ptBR,
                        })}
                      </>
                    ) : (
                      <span>Escolha o dia</span>
                    )}
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  className="capitalize"
                  initialFocus
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  numberOfMonths={1}
                  locale={ptBR}
                  disabled={(date) =>
                    date > (endDate ?? new Date()) || date < startDate
                  }
                />
              </PopoverContent>
            </Popover>
          </div>
        </FormItem>
      )}
    />
  )
}
