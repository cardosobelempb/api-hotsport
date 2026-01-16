import "express-session";

declare module "express-session" {
  interface SessionData {
    theme?: string;
    themeColor?: string;
  }
}
