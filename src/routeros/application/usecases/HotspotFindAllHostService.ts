import { RouterosClient } from '@/common/infrastructure/routeros'
export interface HotspotHost {
  address: string
  macAddress: string
  server: string
}

export class HotspotFindAllHostService {
  constructor(private readonly router: RouterosClient) {}

  async execute(): Promise<HotspotHost[]> {
    const result = await this.router.write(['/ip/hotspot/host/print'])

    return result.map(item => ({
      address: item.address,
      macAddress: item['mac-address'],
      server: item.server,
    }))
  }
}
