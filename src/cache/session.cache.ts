// src/cache/session.cache.ts

import { Request } from 'express'

export function getFromSession<T>(req: Request, key: string): T | null {
  return req.session[key] ?? null
}

export function saveInSession(req: Request, key: string, value: any): void {
  req.session[key] = value
}
