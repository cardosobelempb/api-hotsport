// src/utils/encoder.ts

import crypto from 'crypto'

/**
 * Simula o jsEncode do PHP (ofuscação simples)
 * ⚠️ Não é criptografia real
 */
export function encodeString(data: string, rounds = 25): string {
  let encoded = data
  for (let i = 0; i < rounds; i++) {
    encoded = Buffer.from(encoded).toString('base64')
  }
  return encoded
}
