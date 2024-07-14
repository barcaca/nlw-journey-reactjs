'use client'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Calendar as CalendarIcon } from 'lucide-react'
import * as React from 'react'
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

export function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const { control } = useFormContext()

  const isPastDate = (date: Date) => {
    const today = new Date()
    // Zera a hora para comparar apenas a data
    today.setHours(0, 0, 0, 0)
    // Define amanhã como o dia de hoje mais um dia
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)
    // Verifica se a data é menor que amanhã
    return date < tomorrow
  }

  return (
    <FormField
      name="date"
      control={control}
      render={({ field }) => (
        <FormItem>
          <div className={cn('grid gap-2', className)}>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    id="date"
                    variant={'ghost'}
                    className={cn(
                      'justify-start text-left font-normal capitalize',
                      !field && 'text-muted-foreground',
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                    {field.value?.from ? (
                      field.value.to ? (
                        <>
                          {format(field.value.from, ' dd MMMM', {
                            locale: ptBR,
                          })}{' '}
                          -{' '}
                          {format(field.value.to, ' dd MMMM', { locale: ptBR })}
                        </>
                      ) : (
                        format(field.value.from, 'dd MMMM', { locale: ptBR })
                      )
                    ) : (
                      <span>Quando ?</span>
                    )}
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  className="capitalize"
                  initialFocus
                  mode="range"
                  defaultMonth={field.value?.from}
                  selected={{ from: field.value.from!, to: field.value.to }}
                  onSelect={field.onChange}
                  numberOfMonths={2}
                  disabled={isPastDate}
                  locale={ptBR}
                />
              </PopoverContent>
            </Popover>
          </div>
        </FormItem>
      )}
    />
  )
}
