import crypto from 'crypto'

/**
 * Exemplo simples de descriptografia
 * Ajuste conforme algoritmo real usado no PHP
 */
export function decryptPassword(encrypted: string): string {
  // Exemplo fictício
  return Buffer.from(encrypted, 'base64').toString('utf-8')
}
