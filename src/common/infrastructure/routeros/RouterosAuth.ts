import { encodeString, useSentenceParser } from './helpers'
import { RouterosSocket } from './RouterosConnection'
import RouterosException from './RouterosException'

export class RouterosAuth {
  constructor(
    private readonly socket: RouterosSocket,
    private readonly user: string,
    private readonly password: string,
  ) {}

  login(): Promise<void> {
    this.writeLogin()

    return new Promise((resolve, reject) => {
      const cleanup = () => {
        this.socket.off('data', onData)
      }

      const onData = (buffer: Buffer) => {
        useSentenceParser(buffer, (line: string) => {
          if (line === '!trap') {
            cleanup()
            reject(new RouterosException('Falha no login RouterOS'))
          }

          if (line === '!done') {
            cleanup()
            resolve()
          }
        })
      }

      this.socket.on('data', onData)
    })
  }

  private writeLogin(): void {
    this.writeWords([
      '/login',
      `=name=${this.user}`,
      `=password=${this.password}`,
    ])
  }

  private writeWords(words: Array<string | null>): void {
    for (const word of words) {
      this.socket.write(encodeString(word))
    }
    this.socket.write(encodeString(null))
  }
}
