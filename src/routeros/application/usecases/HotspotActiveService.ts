import { RouterosClient } from '@/common/infrastructure/routeros'

export interface HotspotActive {
  user: string
  address: string
  macAddress: string
  uptime: string
}

export class HotspotActiveService {
  constructor(private readonly router: RouterosClient) {}

  async execute(): Promise<HotspotActive[]> {
    const rawData = await this.router.write(['/ip/hotspot/active/print'])

    // Mapeando dados RouterOS para DTO tipado
    return rawData.map(item => ({
      user: item.user,
      address: item.address,
      macAddress: item['mac-address'],
      uptime: item.uptime,
    }))
  }
}
