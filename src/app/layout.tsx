import '@/styles/globals.css'

import type { Metadata } from 'next'

import { Provider } from '@/app/provider'
import { poppins, raleway } from '@/fonts/fonts'

export const metadata: Metadata = {
  title: 'plann.er',
  description: 'A tool to help you plan and organize your life',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${raleway.variable} h-full`}
    >
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
