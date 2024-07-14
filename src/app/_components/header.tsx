import Image from 'next/image'

export function Header() {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Image
        width={170}
        height={50}
        src={'/logo-with-name.svg'}
        alt="planner logo"
        className="h-auto w-auto text-foreground"
      />
      <p className="text-lg">
        Convide seus amigos e planeje sua próxima viagem!
      </p>
    </div>
  )
}
