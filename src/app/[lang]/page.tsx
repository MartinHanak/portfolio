import { Locale } from '../../i18n-config'
import { LanguageSwitchLabels, Navbar, NavbarLinks } from "./components/Navbar/Navbar"
import { Footer } from "./components/Footer/Footer"
import { Hero } from "./components/Hero/Hero"
import { Container } from "./components/Containter"
import { About } from "./components/About/About"
import { Skills } from "./components/Skills/Skills"
import { Projects } from './components/Projects/Projects'

import { useTranslation } from "../i18n"
import { BigContainer } from './components/BigContainer'
import { Background } from './components/Background'

interface Home {
  params: { lang: Locale }
}

export default async function Home({ params: { lang } }: Home) {

  const { t } = await useTranslation(lang, 'common')

  const t_navbar = (await useTranslation(lang, 'navbar')).t
  const t_footer = (await useTranslation(lang, 'footer')).t
  const t_skills = (await useTranslation(lang, 'skills')).t

  const languageSwitchLabels: LanguageSwitchLabels = {
    language: t_navbar('language'),
    czech: t_navbar('Czech'),
    english: t_navbar('English')
  }

  const navbarLinks: NavbarLinks = {
    home: t_navbar('home'),
    about: t_navbar('about'),
    projects: t_navbar('projects'),
    skills: t_navbar('skills'),
    contact: t_navbar('contact'),
  }

  return (
    <>
      <Background>

        <Navbar languageSwitch={languageSwitchLabels} navbar={navbarLinks} />

        <BigContainer>
          <Hero id={navbarLinks.home} subheading={t_footer('belowName')} />
        </BigContainer>

      </Background>

      <Container>
        <About id={navbarLinks.about} lang={lang} />

        <Skills id={navbarLinks.skills}
          heading={t_skills('heading')}
          frontendText={t_skills('frontend')}
          backendText={t_skills('backend')}
          toolsText={t_skills('tools')} />

        <Projects id={navbarLinks.projects} lang={lang} />

      </Container >


      <Footer id={navbarLinks.contact} lang={lang} />
    </>
  )
}
