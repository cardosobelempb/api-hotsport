// src/services/hotspot-server.service.ts

import { RouterOsClient } from '../infra/routeros.client'

export class HotspotServerService {
  constructor(private readonly router: RouterOsClient) {}

  async getServers() {
    return this.router.command('/ip/hotspot/print')
  }
}
