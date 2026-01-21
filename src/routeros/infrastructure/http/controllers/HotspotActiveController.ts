// src/controllers/hotspot.controller.ts

import { HotspotActiveService } from '@/routeros/application/services/HotspotActiveService'
import { Request, Response } from 'express'

export class HotspotActiveController {
  constructor(private readonly hotspotActiveService: HotspotActiveService) {}

  async handler(request: Request, response: Response): Promise<Response> {
    try {
      const activeHosts = await this.hotspotActiveService.execute()
      return response.json(activeHosts)
    } catch (error: any) {
      console.error('Erro ao buscar hotspot ativo:', error)
      return response.status(500).json({ message: 'Erro interno do servidor' })
    }
  }
}
