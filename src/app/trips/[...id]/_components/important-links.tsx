import { Link2Icon } from 'lucide-react'
import Link from 'next/link'

import { getLinks } from '@/lib/data/links'

import { CreateModalLink } from './create-modal-link'

export async function ImportantLinks({ tripId }: { tripId: string }) {
  const links = await getLinks(tripId)
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Links importantes</h2>
      <div className="space-y-5">
        {links.map((link) => {
          return (
            <div
              key={link.id}
              className="flex items-center justify-between gap-4"
            >
              <div className="w-0 flex-1 space-y-1.5">
                <span className="block font-medium">{link.title}</span>
                <Link
                  href={link.url}
                  target="_blank"
                  className="block truncate text-xs text-muted-foreground hover:text-foreground"
                >
                  {link.url}
                </Link>
              </div>
              <Link2Icon size={20} className="size-5 shrink-0 text-primary" />
            </div>
          )
        })}
      </div>
      <CreateModalLink tripId={tripId} />
    </div>
  )
}
