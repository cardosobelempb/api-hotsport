// src/controllers/traffic.controller.ts

import { Request, Response } from "express";
import { TrafficService } from "../services/traffic.service";

export function getTraffic(service: TrafficService) {
  return async (req: Request, res: Response) => {
    const iface = req.query.iface as string;

    if (!iface) {
      res.status(400).json({ error: "Interface não informada" });
      return;
    }

    const data = await service.getTraffic(iface);
    res.json(data);
  };
}
