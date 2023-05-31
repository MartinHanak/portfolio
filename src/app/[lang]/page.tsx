import { prisma } from "../../db"
import { ContactForm } from "./components/ContactForm"
import { TestStyle } from "./components/TestStyle"

import { getDictionary } from "../../get-dictionary"
import { Locale } from '../../i18n-config'
import Counter from "./components/counter"
import LocaleSwitcher from './components/locale-switcher'

interface Home {
  params: { lang: Locale }
}

export default async function Home({ params: { lang } }: Home) {

  const messages = await prisma.message.findMany()
  const dictionary = await getDictionary(lang)

  return (
    <>
      <div>
        <LocaleSwitcher />
        <p>Current locale: {lang}</p>
        <p>
          This text is rendered on the server:{' '}
          {dictionary['server-component'].welcome}
        </p>
        <Counter dictionary={dictionary.counter} />
      </div>

      <h1>Hello</h1>
      <div>
        {messages.map((message, index) => {
          return <p key={index}>{message.message}</p>
        })}
      </div>

      <ContactForm />
    </>
  )
}
