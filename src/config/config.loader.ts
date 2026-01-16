import fs from "fs";
import path from "path";
import { CONFIG_TOKENS } from "./config.map";
import { parseConfigValue } from "../utils/config.parser";
import { AppConfig } from "./config.types";

/**
 * Responsável por carregar configurações do sistema
 * SRP: apenas leitura e parsing
 */
export function loadAppConfig(mUser: string): AppConfig {
  const filePath = path.resolve(__dirname, "../../config/config.php");
  const lines = fs.readFileSync(filePath, "utf-8").split("\n");

  for (const line of lines) {
    const userKey = line.split("'")[1];

    if (userKey !== mUser) continue;

    return {
      user: {
        ipHost: parseConfigValue(line, mUser + CONFIG_TOKENS.ipHost),
        userHost: parseConfigValue(line, mUser + CONFIG_TOKENS.userHost),
        passwordHost: parseConfigValue(
          line,
          mUser + CONFIG_TOKENS.passwordHost
        ),
        hotspotName: parseConfigValue(line, mUser + CONFIG_TOKENS.hotspotName),
        dnsName: parseConfigValue(line, mUser + CONFIG_TOKENS.dnsName),
        currency: parseConfigValue(line, mUser + CONFIG_TOKENS.currency),
        phone: parseConfigValue(line, mUser + CONFIG_TOKENS.phone),
        email: parseConfigValue(line, mUser + CONFIG_TOKENS.email),
        infoLp: parseConfigValue(line, mUser + CONFIG_TOKENS.infoLp),
        idleTimeout: parseConfigValue(line, mUser + CONFIG_TOKENS.idleTimeout),
        sessionName: parseConfigValue(line, mUser + CONFIG_TOKENS.sessionName),
        report: parseConfigValue(line, mUser + CONFIG_TOKENS.report),
        token: parseConfigValue(line, mUser + CONFIG_TOKENS.token),
      },
      admin: {
        user: parseConfigValue(line, "mikhmon<|<"),
        pass: parseConfigValue(line, "mikhmon>|>"),
      },
    };
  }

  throw new Error(`Configuração não encontrada para usuário ${mUser}`);
}
