// src/routes/hotspot.routes.ts

import { Router } from 'express'
import { getHotspotServers } from '../controllers/HotspotServerController'

export const hotspotRouter = Router()

hotspotRouter.get('/servers', getHotspotServers)
