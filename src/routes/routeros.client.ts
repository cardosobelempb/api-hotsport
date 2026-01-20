// src/infra/routeros.client.ts

import { RouterOSAPI } from 'node-routeros'
import { RouterOSResponse } from '../types/RouterOSResponse'

export class RouterOsClient {
  private api: RouterOSAPI

  constructor(config: { host: string; user: string; password: string }) {
    this.api = new RouterOSAPI(config)
  }

  async connect(): Promise<void> {
    await this.api.connect()
  }

  /**
   * Substitui $API->comm() do PHP
   */
  async command(
    path: string,
    args: string[] = [],
  ): Promise<RouterOSResponse[]> {
    return this.api.write(path, args)
  }

  close(): void {
    this.api.close()
  }
}
