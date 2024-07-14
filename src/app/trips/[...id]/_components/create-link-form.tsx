import { zodResolver } from '@hookform/resolvers/zod'
import { Link2Icon, TagIcon } from 'lucide-react'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'

import { createLinkAction } from '@/actions/link/create'
import { CreateLinkSchema, TCreateLinkData } from '@/actions/link/create/schema'
import { Button } from '@/components/ui/button'
import { DialogFooter } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

interface CreateLinkFormProps {
  onClickSubmit: () => void
  tripId: string
}

export function CreateLinkForm({ onClickSubmit, tripId }: CreateLinkFormProps) {
  const [isPending, startTransition] = useTransition()
  const createLinkActionWithId = createLinkAction.bind(null, tripId)

  const defaultValues = {
    title: '',
    url: '',
  }

  const form = useForm<TCreateLinkData>({
    resolver: zodResolver(CreateLinkSchema),
    defaultValues,
  })

  async function onCreateLink(formData: TCreateLinkData) {
    startTransition(() => {
      createLinkActionWithId(formData).then(() => {
        onClickSubmit()
        form.reset()
      })
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onCreateLink)}>
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
                    placeholder="Título do link"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="!m-0 flex items-center rounded-lg border border-border px-3">
                <Link2Icon size={20} className="text-primary" />
                <FormControl className="!m-0">
                  <Input className="flex-1" placeholder="URL" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending} className="!m-0">
            Salvar link
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
