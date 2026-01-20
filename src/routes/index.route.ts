import { Router, Request, Response } from 'express'

export const indexRouter = Router()

/**
 * Rota principal
 * Equivalente ao index.php
 */
indexRouter.get('/', (_req: Request, res: Response) => {
  res.json({ status: 'API online' })
})
