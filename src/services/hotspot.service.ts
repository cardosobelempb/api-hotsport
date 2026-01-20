// src/services/hotspot.service.ts

import { RouterOsClient } from '../infra/routeros.client'

import { RouterOSResponse } from '../types/RouterOSResponse'

export interface HotspotActive {
  user: string
  address: string
  macAddress: string
  uptime: string
}

export class HotspotService {
  constructor(private readonly router: RouterOsClient) {}

  async getActive(): Promise<HotspotActive[]> {
    const rawData: RouterOSResponse[] = await this.router.command(
      '/ip/hotspot/active/print',
    )

    // Mapeando dados RouterOS para DTO tipado
    return rawData.map(item => ({
      user: item.user,
      address: item.address,
      macAddress: item['mac-address'],
      uptime: item.uptime,
    }))
  }
}
