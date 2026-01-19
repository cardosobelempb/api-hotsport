// src/controllers/pool.controller.ts

import { Request, Response } from "express";
import { PoolService } from "../services/pool.service";
import { ApiClient } from "../api/api.client";

const poolService = new PoolService(new ApiClient());

export async function getPoolController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    // Query param ?f=true|false
    const force = req.query.f === "true";

    // Chave de sessão (equivalente ao PHP)
    const sessionKey = `${req.session.id}_addr_pool`;

    const pool = await poolService.getPool(force, req.session, sessionKey);

    res.json(pool);
  } catch (error) {
    console.error("Erro ao buscar pool:", error);
    res.status(500).json({ error: "Erro interno" });
  }
}
