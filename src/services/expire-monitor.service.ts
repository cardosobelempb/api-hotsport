// src/services/expire-monitor.service.ts

import { RouterOsClient } from '../infra/routeros.client'

/**
 * Serviço responsável por verificar
 * o status do Expire Monitor no MikroTik
 */
export class ExpireMonitorService {
  constructor(private readonly router: RouterOsClient) {}

  /**
   * Verifica se o scheduler Mikhmon-Expire-Monitor está ativo
   */
  async isExpireMonitorReady(): Promise<{ expire_monitor: string }> {
    const schedulers = await this.router.command('/system/scheduler/print', {
      '?name': 'Mikhmon-Expire-Monitor',
      '?disabled': 'false',
    })

    const isReady =
      schedulers.length > 0 && schedulers[0].name === 'Mikhmon-Expire-Monitor'

    return {
      expire_monitor: isReady ? 'ok' : 'not ready',
    }
  }
}
