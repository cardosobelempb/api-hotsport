// src/controllers/system.controller.ts

import { Request, Response } from "express";
import { SystemService } from "../services/system.service";

export function getSystemResource(service: SystemService) {
  return async (_req: Request, res: Response) => {
    try {
      const data = await service.getSystemResource();
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao buscar recursos do sistema" });
    }
  };
}
