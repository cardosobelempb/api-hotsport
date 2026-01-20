import fs from 'fs'
import path from 'path'
import { Plugin } from './plugin.interface'

/**
 * Loader SEGURO de plugins
 * (substitui comportamento ilegal do PHP)
 */
export function loadPlugins(): Plugin[] {
  const dir = path.resolve(__dirname)
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.plugin.js'))

  return files.map(file => {
    const plugin: Plugin = require(path.join(dir, file))
    return plugin
  })
}
