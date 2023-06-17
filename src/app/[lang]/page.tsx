import { prisma } from "../../db"
import { ContactForm } from "./components/ContactForm"
import { TestStyle } from "./components/TestStyle"

import { getDictionary } from "../../get-dictionary"
import { Locale } from '../../i18n-config'
import Counter from "./components/counter"
import LocaleSwitcher from './components/locale-switcher'
import { TestMolecule } from "./components/TestMolecule"
import { TestHexagon } from "./components/TestHexagon"
import { TestHexagon2 } from "./components/TestHexagon2"
import { TestHexagon3 } from "./components/TestHexagon3"
import { Navbar } from "./components/Navbar"
import { Footer } from "./components/Footer"
import { Hero } from "./components/Hero"
import { Container } from "./components/Containter"

interface Home {
  params: { lang: Locale }
}

export default async function Home({ params: { lang } }: Home) {

  const messages = await prisma.message.findMany()
  const dictionary = await getDictionary(lang)

  return (
    <>
      <Navbar />


      <Container>
        <Hero />
      </Container>




      <TestHexagon3 />

      <Footer />
    </>
  )
}
