/**
 * Temas suportados pela aplicação
 */
export const THEMES = {
  dark: "#3a4149",
  light: "#008BC9",
  blue: "#008BC9",
  green: "#37BA68",
  pink: "#e83e8c",
} as const;

export type ThemeName = keyof typeof THEMES;
