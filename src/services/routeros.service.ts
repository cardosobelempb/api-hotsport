import { RouterOSAPI } from 'node-routeros'
import { routerConfig } from '../config/router.config'
import { decryptPassword } from '../utils/crypto.util'

/**
 * Serviço responsável por conexão com o RouterOS
 * SRP: apenas comunicação com Mikrotik
 */
export class RouterOSService {
  private client: RouterOSAPI

  constructor() {
    this.client = new RouterOSAPI({
      host: routerConfig.host,
      user: routerConfig.user,
      password: decryptPassword(routerConfig.password),
    })
  }

  async connect(): Promise<void> {
    try {
      await this.client.connect()
      console.log('✅ Conectado ao RouterOS')
    } catch (error) {
      console.error('❌ Erro ao conectar no RouterOS', error)
      throw error
    }
  }
}
