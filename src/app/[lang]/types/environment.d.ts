declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GMAIL_EMAIL_ADDRESS: string
      GMAIL_EMAIL_PASSWORD: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}