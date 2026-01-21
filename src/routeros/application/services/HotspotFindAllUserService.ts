import { RouterosClient } from '@/common/infrastructure/routeros'

interface HotspotUser {
  '.id': string
  name: string
  password?: string
}

export class HotspotFindAllUserService {
  constructor(private readonly router: RouterosClient) {}
  async execute(): Promise<HotspotUser[]> {
    try {
      const users = await this.router.write<HotspotUser>([
        '/ip/hotspot/user/print',
      ])

      return users
    } finally {
      this.router.destroy()
    }
  }
}
