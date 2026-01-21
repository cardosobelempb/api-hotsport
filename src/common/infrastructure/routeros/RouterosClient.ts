import { RouterosAuth } from './RouterosAuth'
import { RouterosConfig, validateRouterosConfig } from './RouterosConfig'
import { RouterosConnection } from './RouterosConnection'
import { RouterosWriter } from './RouterosWriter'

export class RouterosClient {
  private connection!: RouterosConnection
  private writer!: RouterosWriter

  constructor(private readonly config: RouterosConfig) {
    validateRouterosConfig(config)
  }

  async connect(): Promise<this> {
    this.connection = new RouterosConnection(this.config)
    const socket = await this.connection.connect()

    const auth = new RouterosAuth(
      socket,
      this.config.user,
      this.config.password,
    )

    await auth.login()
    this.writer = new RouterosWriter(socket)

    return this
  }

  write<T extends Record<string, any>>(queries: string[]): Promise<T[]> {
    return this.writer.write<T>(queries)
  }

  destroy(): void {
    this.connection.destroy()
  }
}

/**
 const client = await new RouterosClient({
  host: '192.168.0.1',
  port: 8729,
  user: 'admin',
  password: 'admin',
  tlsOptions: {},
}).connect()

const users = await client.write<{ name: string }>([
  '/ip/hotspot/user/print',
])

console.log(users[0].name)

 */
