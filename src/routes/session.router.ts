import { Router } from 'express'
import fs from 'node:fs'

import path from 'node:path'

export const sessionRouter = Router()

const CONFIG_FILE = path.resolve('./config/config.json')
// Funções utilitárias
function readConfig() {
  if (!fs.existsSync(CONFIG_FILE)) return {}
  return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'))
}

function writeConfig(config: any) {
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), 'utf-8')
}

// Sanitização simples de nomes
function sanitizeName(name: string): string {
  return name.replace(/[^a-zA-Z0-9]/g, '').trim()
}

/**
 * Rotas sessionistrativas
 */
sessionRouter.post('/add', (req, res) => {
  const { router } = req.body
  if (!router) return res.status(400).json({ message: 'Router is required' })

  const config = readConfig()
  const sessionName = sanitizeName(
    router + Math.floor(Math.random() * 900 + 100),
  )

  config[sessionName] = {
    ip: '',
    user: '',
    password: '',
    hotspot: '',
    dns: '',
    currency: '',
    phone: '',
    email: '',
    idleto: '',
    report: '',
    token: '',
  }

  writeConfig(config)
  res.json({ message: 'Success', sessname: sessionName })
})

sessionRouter.get('/remove', (req, res) => {
  const { router } = req.body
  const config = readConfig()
  if (!config[router])
    return res.status(404).json({ message: 'Session not found' })

  delete config[router]
  writeConfig(config)

  const logoPath = path.resolve(`./assets/img/logo-${router}.png`)
  if (fs.existsSync(logoPath)) fs.unlinkSync(logoPath)

  res.json({ message: 'Success' })
})
