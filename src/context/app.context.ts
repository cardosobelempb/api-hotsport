import { AppConfig } from "../config/config.types";

export class AppContext {
  private static config: AppConfig;

  static setConfig(config: AppConfig) {
    this.config = config;
  }

  static getConfig(): AppConfig {
    return this.config;
  }
}
