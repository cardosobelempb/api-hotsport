import { Router } from 'express'
import { blockAccess } from '../middlewares/forbidden.middleware'

export const protectedRouter = Router()

/**
 * Qualquer acesso aqui será bloqueado
 */
protectedRouter.use(blockAccess)
