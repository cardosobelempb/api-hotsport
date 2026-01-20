// src/services/traffic.service.ts

import { RouterOsClient } from '../infra/routeros.client'

export class TrafficService {
  constructor(private readonly router: RouterOsClient) {}

  async getTraffic(interfaceName: string) {
    const [traffic] = await this.router.command('/interface/monitor-traffic', {
      interface: interfaceName,
      once: '',
    })

    return {
      tx: traffic['tx-bits-per-second'],
      rx: traffic['rx-bits-per-second'],
    }
  }
}
