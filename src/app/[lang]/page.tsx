import { Locale } from '../../i18n-config'
import { Navbar } from "./components/Navbar/Navbar"
import { Footer } from "./components/Footer/Footer"
import { Hero } from "./components/Hero/Hero"
import { Container } from "./components/Containter"
import { About } from "./components/About/About"
import { Skills } from "./components/Skills/Skills"
import { Projects } from './components/Projects/Projects'

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
