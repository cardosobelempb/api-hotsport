import { Router } from 'express'

export const adminRouter = Router()

/**
 * Rotas administrativas
 */
adminRouter.get('/settings', (_req, res) => {
  res.json({ page: 'admin settings' })
})

adminRouter.get('/login', (_req, res) => {
  res.json({ page: 'login' })
})
