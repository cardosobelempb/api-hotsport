import fs from 'fs'
import path from 'path'
import { THEMES, ThemeName } from '../config/theme.config'

/**
 * Serviço responsável por gerenciar temas
 * SRP: apenas regra de tema
 */
export class ThemeService {
  static isValidTheme(theme: string): theme is ThemeName {
    return theme in THEMES
  }

  static getThemeColor(theme: ThemeName): string {
    return THEMES[theme]
  }

  /**
   * Persiste o tema em arquivo (JSON, não código!)
   */
  static saveTheme(theme: ThemeName, color: string): void {
    const filePath = path.resolve(__dirname, '../../config/theme.json')

    const data = {
      theme,
      color,
    }

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
  }
}
