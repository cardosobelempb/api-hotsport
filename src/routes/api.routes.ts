// src/routes/api.routes.ts

import { Router } from "express";
import { getSystemResource } from "../controllers/system.controller";
import { getTraffic } from "../controllers/traffic.controller";
import { getExpireMonitorStatus } from "../controllers/expire-monitor.controller";
import { getHotspotHosts } from "../controllers/hotspot-host.controller";

export function buildRoutes(services: any) {
  const router = Router();

  router.get("/system/resource", getSystemResource(services.system));
  router.get("/traffic", getTraffic(services.traffic));
  router.get("/expire-monitor", getExpireMonitorStatus(services.expireMonitor));
  // src/routes/api.routes.ts

  router.get("/hotspot/hosts", getHotspotHosts(services.hotspotHost));

  return router;
}
