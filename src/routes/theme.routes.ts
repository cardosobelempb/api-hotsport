import { Router } from 'express'
import { setTheme } from '../controllers/theme.controller'

export const themeRouter = Router()

/**
 * POST é o correto (altera estado)
 */
themeRouter.post('/theme', setTheme)
