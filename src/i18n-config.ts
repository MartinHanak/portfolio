export const i18n = {
  defaultLocale: 'cs',
  locales: [ 'en', 'cs'],
} as const

export type Locale = typeof i18n['locales'][number]