// src/middlewares/protect.middleware.ts

import { Request, Response, NextFunction } from 'express'

/**
 * Middleware para proteger acesso direto
 */
export function protectMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  // Em Node, o controle é feito por rotas, não por arquivo
  if (!req.route) {
    res.status(403).json({ error: 'Acesso não permitido' })
    return
  }

  next()
}
