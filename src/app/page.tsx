import Link from 'next/link'

import { Header } from '@/app/_components/header'
import { CreateTripForm } from '@/components/create-trip/create-trip-form'

export default function Home() {
  return (
    <div className="flex h-screen items-center justify-center bg-pattern bg-center bg-no-repeat px-6 text-center">
      <div className="w-full max-w-3xl space-y-10">
        <Header />
        <CreateTripForm />
        <p className="text-sm text-muted-foreground">
          Ao planejar sua viagem pela plann.er você automaticamente concorda{' '}
          <br /> com nossos{' '}
          <Link className="text-foreground underline" href={'#'}>
            termos de uso
          </Link>{' '}
          e{' '}
          <Link className="text-foreground underline" href={'#'}>
            políticas de privacidade
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
