import { HotspotFindAllUserService } from '@/routeros/application/services/HotspotFindAllUserService'
import { Request, Response } from 'express'

export class HotspotFindAllUserController {
  constructor(
    private readonly hotspotFindAllUserService: HotspotFindAllUserService,
  ) {}

  async handler(request: Request, response: Response): Promise<Response> {
    try {
      const users = await this.hotspotFindAllUserService.execute()
      return response.json(users)
    } catch (error: any) {
      return response.status(500).json({
        error: error.message,
      })
    }
  }
}
