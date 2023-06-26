import './globals.css'
import { i18n } from '../../i18n-config'

import { IBM_Plex_Mono } from 'next/font/google';
import { Metadata } from 'next';


// for now: causes error with server actions experimental feature when submitting a form
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export const metadata: Metadata = {
  title: 'Martin Hanák',
  description: 'Martin Hanák portfolio.',
  icons: {
    icon: '/MH_logo.svg',
    shortcut: '/MH_logo.svg',
    apple: '/MH_logo.svg',
    other: {
      rel: 'MH_logo',
      url: '/MH_logo.svg',
    },
  }
}


const IBMFont = IBM_Plex_Mono({
  weight: ["400", "700"],
  style: ["normal"],
  subsets: ["latin"],
  variable: '--font-IBM',
})

export default function Root({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  return (
    <html lang={params.lang} className={`${IBMFont.variable} ${IBMFont.className}`}>
      <body>{children}</body>
    </html>
  )
}
