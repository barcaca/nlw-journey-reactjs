import { type ClassValue, clsx } from 'clsx'
import { format } from 'date-fns/format'
import { ptBR } from 'date-fns/locale'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string) {
  return format(date, 'dd MMMM', { locale: ptBR })
}
