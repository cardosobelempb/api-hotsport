// src/controllers/hotspot-server.controller.ts

import { Request, Response } from 'express'
import { HotspotServerService } from '../services/hotspot-server.service'
import { RouterOsClient } from '../infra/routeros.client'
import { encodeString } from '../utils/encoder'

export async function getHotspotServers(req: Request, res: Response) {
  const force = req.query.f === 'true'
  const m_user = req.session.user

  const sessionKey = `${m_user}:hotspot-server`

  if (!force && req.session[sessionKey]) {
    return res.send(req.session[sessionKey])
  }

  const router = new RouterOsClient(req.session.routerConfig)
  const service = new HotspotServerService(router)

  try {
    await router.connect()

    const servers = await service.getServers()
    const json = JSON.stringify(servers)
    const encoded = encodeString(json, 25)

    req.session[sessionKey] = encoded
    res.send(encoded)
  } catch (err: any) {
    res.status(500).json({
      message: 'Erro ao buscar hotspot servers',
      error: err.message,
    })
  } finally {
    router.close()
  }
}
