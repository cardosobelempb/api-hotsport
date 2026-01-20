/**
 * Representa a configuração de uma sessão
 */
export interface SessionConfig {
  enabled: boolean
  timeout: number
  tokens: string[]
  routerConfig: {
    host: string
    user: string
    password: string
  }
}

/**
 * Representa a configuração geral da aplicação
 */
export interface AppConfig {
  mikhmon: {
    enabled: boolean
    keys: string[]
  }
  sessions: Record<string, SessionConfig>
}
