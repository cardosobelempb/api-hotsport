// src/routes/hotspot.routes.ts

import { Router } from 'express'
import fs from 'node:fs'
import path from 'node:path'
import { HotspotUserService } from '../../../application/usecases/HotspotCreateUserService'
import { RouterOsClient } from '../infra/routeros.client'

const CONFIG_FILE = path.resolve('./config/config.json')

function readConfig() {
  if (!fs.existsSync(CONFIG_FILE)) return {}
  return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'))
}

export const hotspotRouter = Router()

hotspotRouter.post('/add', async (req, res) => {
  if (!req.session?.id) {
    return res.status(403).json({ message: 'Forbidden' })
  }

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
  } = req.body

  const m_user = sessname.split('?')[1]
  const config = readConfig()

  if (!config[m_user]) {
    return res.status(400).json({ message: 'Invalid session' })
  }

  const router = new RouterOsClient({
    host: config[m_user].ip,
    user: config[m_user].user,
    password: config[m_user].password,
  })

  const service = new HotspotUserService(router)

  try {
    await router.connect()

    const userComment = name === password ? `vc-${comment}` : `up-${comment}`

    const added = await service.addUser({
      server,
      name,
      password,
      profile,
      macaddr,
      timelimit,
      datalimit,
      comment: userComment,
    })

    const user = await service.getUserById(added.ret)

    res.json({ message: 'success', data: user })
  } catch (err: any) {
    res.status(500).json({
      message: 'error',
      error: err.message,
    })
  } finally {
    router.close()
  }
})
