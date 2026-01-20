/**
 * Extrai valor baseado em token
 * Equivalente ao get_config() do PHP
 */
export function parseConfigValue(
  line: string,
  key: string,
  delimiter = "'",
): string {
  const index = line.indexOf(key)
  if (index === -1) return ''

  const sliced = line.slice(index + key.length)
  const parts = sliced.split(delimiter)

  return parts[0] ?? ''
}
