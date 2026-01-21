import { ConnectionOptions } from 'node:tls'

import RouterosException from './RouterosException'

export interface RouterosConfig {
  host: string
  port: number
  user: string
  password: string
  timeout?: number
  tlsOptions?: ConnectionOptions
}

export function validateRouterosConfig(config: RouterosConfig): void {
  if (config.tlsOptions && config.port === 8728) {
    throw new RouterosException(
      'TLS não é suportado na porta 8728. Use a porta 8729.',
    )
  }
}
