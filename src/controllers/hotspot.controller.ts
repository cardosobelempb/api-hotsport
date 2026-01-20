// src/controllers/hotspot.controller.ts

import { Request, Response } from 'express'

export async function getActive(req: Request, res: Response) {
  try {
    const activeHosts = await this.hotspotService.getActive()
    res.json(activeHosts)
  } catch (error) {
    console.error('Erro ao buscar hotspot ativo:', error)
    res.status(500).json({ message: 'Erro interno do servidor' })
  }
}
