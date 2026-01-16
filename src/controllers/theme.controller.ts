import { Request, Response } from "express";
import { ThemeService } from "../services/theme.service";

/**
 * Controller de troca de tema
 */
export function setTheme(req: Request, res: Response) {
  const theme = req.query.theme as string;

  if (!theme) {
    return res.status(400).json({ error: "Tema não informado" });
  }

  if (!ThemeService.isValidTheme(theme)) {
    return res.status(400).json({ error: "Tema inválido" });
  }

  const color = ThemeService.getThemeColor(theme);

  // salva na sessão
  req.session.theme = theme;
  req.session.themeColor = color;

  // persiste
  ThemeService.saveTheme(theme, color);

  res.json({
    message: "Tema alterado com sucesso",
    theme,
    color,
  });
}
