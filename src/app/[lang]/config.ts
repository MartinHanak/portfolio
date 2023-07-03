const devMode = process.env.NEXT_PUBLIC_DEVMODE;

export const BACKEND_URL = devMode ? 'http://localhost:3000' : 'https://martinhanak.com'