// src/services/system.service.ts

import { RouterOsClient } from '../infra/routeros.client'

export class SystemService {
  constructor(private readonly router: RouterOsClient) {}
  async getSystemResource() {
    const [clock] = await this.router.command('/system/clock/print')
    const [resource] = await this.router.command('/system/resource/print')
    const [routerboard] = await this.router.command('/system/routerboard/print')
    const [identity] = await this.router.command('/system/identity/print')
    const [health] = await this.router.command('/system/health/print')

    return {
      systime: clock,
      resource,
      syshealth: health,
      model: routerboard.model,
      identity: identity.name,
      timezone: clock['time-zone-name'],
    }
  }
}
