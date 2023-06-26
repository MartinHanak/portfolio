import { Locale } from '../../i18n-config'
import { Navbar } from "./components/Navbar"
import { Footer } from "./components/Footer"
import { Hero } from "./components/Hero"
import { Container } from "./components/Containter"
import { About } from "./components/About"
import { Skills } from "./components/Skills"
import { Projects } from './components/Projects'

import { useTranslation } from "../i18n"

interface Home {
  params: { lang: Locale }
}

export default async function Home({ params: { lang } }: Home) {

  const { t } = await useTranslation(lang, 'common')

  return (
    <>
      <Navbar lang={lang} />


      <Container>

        <h1>{t('title')}</h1>

        <Hero />

        <About />

        <Skills />

        <Projects lang={lang} />

      </Container >


      <Footer />
    </>
  )
}
