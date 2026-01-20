// src/services/pool.service.ts

import { ApiClient } from '../api/api.client'

export class PoolService {
  constructor(private readonly apiClient: ApiClient) {}

  /**
   * Retorna o pool usando cache de sessão
   */
  async getPool(
    force: boolean,
    session: Record<string, any>,
    sessionKey: string,
  ): Promise<unknown> {
    // Se não for forçado e existir cache
    if (!force && session[sessionKey]) {
      return session[sessionKey]
    }

    // Busca na API
    const pool = await this.apiClient.getIpPool()

    // Salva em sessão (cache)
    session[sessionKey] = pool

    return pool
  }
}
