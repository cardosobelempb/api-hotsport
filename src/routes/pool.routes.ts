// src/routes/pool.routes.ts

import { Router } from 'express'
import { getPoolController } from '../controllers/pool.controller'

const poolRouter = Router()

poolRouter.get('/pool', getPoolController)

export default poolRouter
