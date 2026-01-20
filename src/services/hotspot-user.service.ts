// src/services/hotspot-user.service.ts

import { RouterOsClient } from '../infra/routeros.client'
import { buildRosArgs } from '../utils/routeros.utils'

export class HotspotUserService {
  constructor(private readonly router: RouterOsClient) {}

  async addUser(data: {
    server: string
    name: string
    password: string
    profile: string
    macaddr?: string
    timelimit?: string
    datalimit?: string
    comment: string
  }) {
    const args = buildRosArgs({
      server: data.server,
      name: data.name,
      password: data.password,
      profile: data.profile,
      'mac-address': data.macaddr,
      disabled: 'no',
      'limit-uptime': data.timelimit,
      'limit-bytes-total': data.datalimit,
      comment: data.comment,
    })

    const [result] = await this.router.command('/ip/hotspot/user/add', args)

    return result
  }

  async getUserById(id: string) {
    const args = buildRosArgs({ '?.id': id })
    const result = await this.router.command('/ip/hotspot/user/print', args)
    return result[0]
  }
}
