import { ReactNode } from 'react'

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface ModalFormTemplateProps {
  title: string
  description: string
  children: ReactNode
}

export function ModalFormTemplate({
  title,
  description,
  children,
}: ModalFormTemplateProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-lg">{title}</DialogTitle>
        <DialogDescription className="text-sm text-muted-foreground">
          {description}
        </DialogDescription>
      </DialogHeader>
      {children}
    </DialogContent>
  )
}
