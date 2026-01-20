// src/services/hotspot-host.service.ts
import { RouterOsClient } from '../infra/routeros.client'
import { RouterOSResponse } from '../types/RouterOSResponse'

export interface HotspotHost {
  address: string
  macAddress: string
  server: string
}

export class HotspotHostService {
  constructor(private readonly router: RouterOsClient) {}

  async getHosts(): Promise<HotspotHost[]> {
    const result = await this.router.command('/ip/hotspot/host/print')

    return result.map((item: RouterOSResponse) => ({
      address: item.address,
      macAddress: item['mac-address'],
      server: item.server,
    }))
  }
}
