import './globals.css'
import { i18n } from '../../i18n-config'


// for now: causes error with server actions experimental feature when submitting a form
/*
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}
*/

export default function Root({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  return (
    <html lang={params.lang}>
      <body>{children}</body>
    </html>
  )
}
