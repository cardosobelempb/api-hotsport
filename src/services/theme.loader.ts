import fs from 'fs'
import path from 'path'

/**
 * Carrega configuração de tema do disco
 */
export function loadTheme() {
  const filePath = path.resolve(__dirname, '../../config/theme.json')

  if (!fs.existsSync(filePath)) {
    return {
      theme: 'light',
      color: '#008BC9',
    }
  }

  const raw = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(raw)
}
