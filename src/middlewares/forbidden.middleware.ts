import { Request, Response, NextFunction } from 'express'

/**
 * Middleware que bloqueia acesso
 * Decide quando retornar 403
 */
export function blockAccess(_req: Request, res: Response, _next: NextFunction) {
  return res.status(403).json({
    error: 'Você não tem permissão para acessar este recurso',
  })
}
