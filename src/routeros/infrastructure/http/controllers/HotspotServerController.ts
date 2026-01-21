// src/controllers/hotspot-server.controller.ts

import { HotspotServerService } from '@/routeros/application/services/HotspotServerService'
import { Request, Response } from 'express'

export class HotspotServerController {
  constructor(private readonly hotspotServerService: HotspotServerService) {}

  /**
   * Lista os Hotspot Servers
   */
  async handler(request: Request, response: Response): Promise<Response> {
    // const forceRefresh = request.query.f === 'true'
    // const user = request.session.user
    // const sessionKey = `${user}:hotspot-server`

    try {
      // =========================
      // ♻️ Cache em sessão
      // =========================
      // if (!forceRefresh && request.session[sessionKey]) {
      //   return response.send(request.session[sessionKey])
      // }

      // =========================
      // 🚀 Execução da regra
      // =========================
      const encodedResult = await this.hotspotServerService.execute()

      // =========================
      // 💾 Salva cache
      // =========================
      // request.session[sessionKey] = encodedResult

      return response.send(encodedResult)
    } catch (error: any) {
      return response.status(500).json({
        message: 'Erro ao buscar hotspot servers',
        error: error.message,
      })
    }
  }
}
