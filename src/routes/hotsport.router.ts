import { Router } from "express";
import { RouterOSAPI } from "../../node_modules/node-routeros/dist/RouterOSAPI";
import fs from "node:fs";
import path from "node:path";

// Configuração do arquivo
const CONFIG_FILE = path.resolve("./config/config.json");

function readConfig() {
  if (!fs.existsSync(CONFIG_FILE)) return {};
  return JSON.parse(fs.readFileSync(CONFIG_FILE, "utf-8"));
}

export const hotsportRouter = Router();

/**
 * Rotas hotsportistrativas
 */
hotsportRouter.post("/add", async (req, res) => {
  if (!req.session.mikhmon)
    return res.status(403).json({ message: "Forbidden" });

  const {
    sessname,
    server,
    name,
    password,
    profile,
    macaddr,
    timelimit,
    datalimit,
    comment,
  } = req.body;
  const m_user = sessname.split("?")[1];

  let config = readConfig();
  if (!config[m_user])
    return res.status(400).json({ message: "Invalid session" });

  const iphost = config[m_user].ip;
  const userhost = config[m_user].user;
  const passwdhost = config[m_user].password;

  const API = new RouterOSAPI({
    host: iphost,
    user: userhost,
    password: passwdhost,
  });

  try {
    await API.connect();

    const userComment = name === password ? `vc-${comment}` : `up-${comment}`;

    const add = await API.call("/ip/hotspot/user/add", {
      server,
      name,
      password,
      profile,
      "mac-address": macaddr,
      disabled: "no",
      "limit-uptime": timelimit,
      "limit-bytes-total": datalimit,
      comment: userComment,
    });

    if (!add) {
      res.json({ message: "error", data: { error: "Failed to add user" } });
      return;
    }

    const getuser = await API.call("/ip/hotspot/user/print", {
      "?.id": add["ret"],
    });
    res.json({ message: "success", data: getuser[0] });
  } catch (err: any) {
    res.json({ message: "error", data: { error: err.message } });
  } finally {
    API.close();
  }
});
