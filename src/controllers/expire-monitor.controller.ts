// src/controllers/expire-monitor.controller.ts

import { Request, Response } from "express";
import { ExpireMonitorService } from "../services/expire-monitor.service";

/**
 * Controller HTTP para o Expire Monitor
 */
export function getExpireMonitorStatus(service: ExpireMonitorService) {
  return async (_req: Request, res: Response) => {
    try {
      const result = await service.isExpireMonitorReady();
      res.json(result);
    } catch (error) {
      console.error("Erro ao verificar Expire Monitor:", error);
      res.status(500).json({
        error: "Erro ao verificar Expire Monitor",
      });
    }
  };
}
