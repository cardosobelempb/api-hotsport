import net, { Socket } from 'node:net'
import tls, { TLSSocket } from 'node:tls'

import { RouterosConfig } from './RouterosConfig'
import RouterosException from './RouterosException'

export type RouterosSocket = Socket | TLSSocket

export class RouterosConnection {
  private socket!: RouterosSocket

  constructor(private readonly config: RouterosConfig) {}

  connect(): Promise<RouterosSocket> {
    this.socket = this.createSocket()

    if (this.config.timeout) {
      this.socket.setTimeout(this.config.timeout * 1000)
    }

    return new Promise((resolve, reject) => {
      const cleanup = () => {
        this.socket.off('error', onError)
        this.socket.off('timeout', onTimeout)
        this.socket.off('connect', onConnect)
      }

      const onError = (err: Error) => {
        cleanup()
        reject(
          new RouterosException(
            `Erro de conexão ${this.config.host}:${this.config.port} - ${err.message}`,
          ),
        )
      }

      const onTimeout = () => {
        cleanup()
        this.socket.destroy()
        reject(new RouterosException('Timeout de conexão RouterOS'))
      }

      const onConnect = () => {
        cleanup()
        resolve(this.socket)
      }

      this.socket.on('error', onError)
      this.socket.on('timeout', onTimeout)
      this.socket.on('connect', onConnect)
    })
  }

  destroy(): void {
    this.socket?.destroy()
  }

  private createSocket(): RouterosSocket {
    if (this.config.tlsOptions) {
      return tls.connect({
        host: this.config.host,
        port: this.config.port,
        rejectUnauthorized: false,
        ...this.config.tlsOptions,
      })
    }

    const socket = new net.Socket()
    socket.connect(this.config.port, this.config.host)
    return socket
  }
}
