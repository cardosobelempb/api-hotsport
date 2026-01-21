import { Router } from 'express'
import { HotspotServerController } from '../controllers/HotspotServerController'
export const hotspotRouter = Router()

hotspotRouter.get('/servers', HotspotServerController.handler)
