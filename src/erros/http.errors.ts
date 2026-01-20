import { Request, Response, NextFunction } from 'express'

/**
 * Handler padrão para erro 403 (Forbidden)
 * Equivalente à função e403() do PHP
 */
export function forbiddenHandler(
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  res.status(403).json({
    error: 'Acesso negado',
    code: 403,
  })
}
