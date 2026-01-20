import 'express-session'

declare module 'express-session' {
  interface SessionData {
    theme?: string
    themeColor?: string
    routerConfig: {
      host: string
      user: string
      password: string
    }
    user: {
      id: string
      name: string
      email: string
    }
  }
}
