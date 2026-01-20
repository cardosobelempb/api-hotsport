import session from 'express-session'

/**
 * Middleware de sessão
 * Substitui session_start() do PHP
 */
export const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET || 'secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, // true apenas com HTTPS
  },
})
