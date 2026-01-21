export function parseKeyValue(line: string): [string, string] {
  const [, key = '', value = ''] = line.split('=')
  return [key, value]
}
