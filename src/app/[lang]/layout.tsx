import './globals.css'
import { Locale, i18n } from '../../i18n-config'

import { IBM_Plex_Mono } from 'next/font/google';
import { Metadata, ResolvingMetadata } from 'next';
import { useTransition } from 'react';
import { initI18next, useTranslation } from '../i18n';


// for now: causes error with server actions experimental feature when submitting a form
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

/*
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
*/

type Props = {
  params: { lang: Locale }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {

  const nextInstance = await initI18next(params.lang, 'metadata')
  const t = nextInstance.getFixedT(params.lang, 'metadata')

  return {
    title: t('title'),
    applicationName: `${t('title')} Portfolio`,
    metadataBase: new URL("https://martinhanak.com"),
    description: t('description'),
    openGraph: {
      type: 'website',
      url: `https://martinhanak.com/${params.lang}`,
      title: t('title'),
      description: t('description'),
      siteName: t('siteName'),
      locale: params.lang,
      images: './portfolioPreview.webp'
    },
    robots: {
      index: true,
      follow: true,
      noarchive: false,
      nosnippet: false,
      noimageindex: false,
      nocache: false
    },
    authors: [{ name: 'Martin Hanák', url: `https://martinhanak.com/${params.lang}` }],
    generator: 'Next.js',
    keywords: t('keywords', { joinArrays: ',' }),
    themeColor: '#FFFFFF',
    colorScheme: 'light',
    //  viewport: "width=device-width, initial-scale=1",    // set by default
    creator: 'Martin Hanák',
    publisher: 'Martin Hanák',
    alternates: {
      canonical: `https://martinhanak.com/`,
      languages: {
        'en': `https://martinhanak.com/en`,
        'cs': `https://martinhanak.com/cs`,
      }
    },
    icons: {
      icon: '/MH_logo.svg',
      shortcut: '/MH_logo.svg',
      apple: '/MH_logo.svg',
      other: {
        rel: 'MH_logo',
        url: '/MH_logo.svg',
      },
    },
    category: "Personal Portfolio"
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
  params: { lang: Locale }
}) {
  return (
    <html lang={params.lang} className={`${IBMFont.variable} ${IBMFont.className}`}>
      <body>{children}</body>
    </html>
  )
}
