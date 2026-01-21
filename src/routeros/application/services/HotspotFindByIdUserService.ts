// src/services/hotspot-user.service.ts

import { RouterosClient } from '@/common/infrastructure/routeros'
import { buildRosArgs } from '../../../utils/routeros.utils'

export class HotspotFindByIdUserService {
  constructor(private readonly router: RouterosClient) {}

  async execute(id: string) {
    const args = buildRosArgs({ '?.id': id })
    const result = await this.router.write(['/ip/hotspot/user/print', ...args])
    return result[0]
  }
}
