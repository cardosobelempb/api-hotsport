// src/services/hotspot-user.service.ts

import { RouterosClient } from '@/common/infrastructure/routeros'
import { buildRosArgs } from '../../../utils/routeros.utils'

export class HotspotCreateUserService {
  constructor(private readonly router: RouterosClient) {}

  async execute(data: {
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

    const [result] = await this.router.write(['/ip/hotspot/user/add', ...args])

    return result
  }
}
