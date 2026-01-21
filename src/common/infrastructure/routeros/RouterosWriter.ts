import { encodeString, useSentenceParser } from './helpers'
import { parseKeyValue } from './helpers/RouterosParser'
import { RouterosSocket } from './RouterosConnection'
import RouterosException from './RouterosException'
import { RouterosSentence } from './RouterosSentence'

export class RouterosWriter {
  constructor(private readonly socket: RouterosSocket) {}

  /**
   * Envia comandos ao RouterOS e interpreta a resposta
   */
  public write<T extends Record<string, any>>(queries: string[]): Promise<T[]> {
    this.writeWords(queries)

    return new Promise((resolve, reject) => {
      const state = this.createState<T>()

      const cleanup = () => {
        this.socket.off('data', onData)
      }

      const finalize = () => {
        cleanup()

        if (state.isError) {
          reject(new RouterosException(state.messages.join('. ')))
          return
        }

        resolve(state.data)
      }

      const onData = (buffer: Buffer) => {
        useSentenceParser(buffer, (line: string) => {
          this.handleSentence(line, state, finalize)
        })
      }

      this.socket.on('data', onData)
    })
  }

  // ======================
  // 🔌 Escrita de comandos
  // ======================
  private writeWords(words: string[]): void {
    for (const word of words) {
      this.socket.write(encodeString(word))
    }
    this.socket.write(encodeString(null))
  }

  // ======================
  // 🧠 Estado da operação
  // ======================
  private createState<T>() {
    return {
      data: [] as T[],
      current: null as Partial<T> | null,
      isError: false,
      messages: [] as string[],
    }
  }

  // ======================
  // 🧩 Roteador de sentenças
  // ======================
  private handleSentence<T>(
    line: string,
    state: {
      data: T[]
      current: Partial<T> | null
      isError: boolean
      messages: string[]
    },
    finalize: () => void,
  ): void {
    switch (line) {
      case RouterosSentence.Record:
        this.handleNewRecord(state)
        return

      case RouterosSentence.Trap:
        state.isError = true
        return

      case RouterosSentence.Done:
        finalize()
        return

      default:
        if (line.startsWith('=')) {
          this.handleKeyValue(line, state)
        }
    }
  }

  // ======================
  // 📦 Novo registro
  // ======================
  private handleNewRecord<T>(state: {
    data: T[]
    current: Partial<T> | null
  }): void {
    state.current = {}
    state.data.push(state.current as T)
  }

  // ======================
  // 🔑 Par chave/valor
  // ======================
  private handleKeyValue<T>(
    line: string,
    state: {
      current: Partial<T> | null
      isError: boolean
      messages: string[]
    },
  ): void {
    const [key, value] = parseKeyValue(line)

    if (state.isError) {
      state.messages.push(value)
      return
    }

    if (!state.current) {
      return
    }

    state.current[key as keyof T] = value as any
  }
}
