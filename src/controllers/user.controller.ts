import { RouteHandler } from "../types/route.types";

export const getUsers: RouteHandler = async (_req, res) => {
  res.json([{ id: 1, name: "User 1" }]);
};

export const getUser: RouteHandler = async (req, res) => {
  res.json({ id: req.params.id });
};
