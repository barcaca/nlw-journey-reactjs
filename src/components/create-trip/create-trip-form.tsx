'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'

import { createTripAction } from '@/actions/trip/create'
import { CreateTripSchema, TCreateTripData } from '@/actions/trip/create/schema'
import { StepOneDestinationDate } from '@/components/create-trip/step-one-destination-date'
import { StepThreeOwner } from '@/components/create-trip/step-three-owner'
import { StepTwoInviteGuest } from '@/components/create-trip/step-two-invite-guest'
import { Form } from '@/components/ui/form'

const defaultValues = {
  destination: '',
  date: {
    from: undefined,
    to: undefined,
  },
  emails_to_invite: [],
  owner_name: '',
  owner_email: '',
}

export function CreateTripForm() {
  const router = useRouter()
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState<boolean>(false)
  const [isOwnerInputOpen, setIsOwnerInputOpen] = useState<boolean>(false)
  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([])

  const [isPending, startTransition] = useTransition()

  const form = useForm<TCreateTripData>({
    resolver: zodResolver(CreateTripSchema),
    defaultValues,
  })
  const { setValue } = form
  useEffect(() => {
    setValue('emails_to_invite', emailsToInvite)
  }, [emailsToInvite, setValue])

  function handleOwnerInput() {
    setIsOwnerInputOpen(!isOwnerInputOpen)
  }

  function handleGuestsInput() {
    setIsGuestsInputOpen(!isGuestsInputOpen)
  }

  function addEmailToInvite(emailToAdd: string) {
    setEmailsToInvite([...emailsToInvite, emailToAdd])
  }

  function removeEmailToInvite(emailToRemove: string) {
    setEmailsToInvite(emailsToInvite.filter((email) => email !== emailToRemove))
  }

  async function onCreateTrip(formData: TCreateTripData) {
    startTransition(() => {
      createTripAction(formData).then((data) => {
        router.push(`/trips/${data}`)
      })
    })
  }

  return (
    <Form {...form}>
      <form id="trip" onSubmit={form.handleSubmit(onCreateTrip)}>
        <div className="space-y-4">
          <StepOneDestinationDate
            isGuestsInputOpen={isGuestsInputOpen}
            onGuestsInput={handleGuestsInput}
          />
          {isGuestsInputOpen && (
            <StepTwoInviteGuest
              emails={emailsToInvite}
              onRemoveEmail={removeEmailToInvite}
              onAddEmail={addEmailToInvite}
              onOwnerInput={handleOwnerInput}
            />
          )}
          <StepThreeOwner
            isOwnerInputOpen={isOwnerInputOpen}
            setIsOwnerInputOpen={setIsOwnerInputOpen}
            isPending={isPending}
          />
        </div>
      </form>
    </Form>
  )
}
