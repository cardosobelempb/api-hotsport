import { RouteHandler } from "../types/route.types";

/**
 * Controller do dashboard
 * Equivalente a get/get_dashboard.php
 */
export const getDashboard: RouteHandler = async (_req, res) => {
  res.json({
    cpu: "20%",
    memory: "45%",
    uptime: "5d 3h",
  });
};
