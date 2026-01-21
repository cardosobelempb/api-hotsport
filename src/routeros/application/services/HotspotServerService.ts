import { RouterosClient } from '@/common/infrastructure/routeros'

export class HotspotServerService {
  constructor(private readonly router: RouterosClient) {}

  async execute() {
    return this.router.write(['/ip/hotspot/print'])
  }
}
