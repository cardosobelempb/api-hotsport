// src/infra/routeros.utils.ts

/**
 * Converte objeto de parâmetros em argumentos RouterOS
 * Ex: { "?name": "test" } → ["?name=test"]
 */
export function buildRosArgs(params: Record<string, any>): string[] {
  return Object.entries(params).map(([key, value]) => `${key}=${value}`)
}
