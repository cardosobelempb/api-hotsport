import { describe, expect, it } from 'vitest'

import { RouterosClient } from '../RouterosClient'
import RouterosException from '../RouterosException'
import { createRouteros } from './helpers/routeros.helper'

describe('RouterOS Connection', () => {
  it('should return RouterosClient instance when credentials are valid', async () => {
    const routeros = await createRouteros()

    try {
      const client = routeros.connect()

      expect(client).toBeInstanceOf(RouterosClient)
    } finally {
      routeros.destroy()
    }
  })

  it('should execute hotspot user print command successfully', async () => {
    const routeros = await createRouteros()

    try {
      const client = await routeros.connect()
      const response = await client.write(['/ip/hotspot/user/print'])

      expect(response).toBeDefined()
      expect(Array.isArray(response)).toBe(true)
    } finally {
      routeros.destroy()
    }
  })

  describe('Invalid port', () => {
    it('should throw RouterosException when port is incorrect', async () => {
      const routeros = await createRouteros({ port: 8748 })

      await expect(routeros.connect()).rejects.toBeInstanceOf(RouterosException)

      routeros.destroy()
    })

    it('should throw RouterosException when port is out of range', async () => {
      const routeros = await createRouteros({ port: 87288 })

      await expect(routeros.connect()).rejects.toBeInstanceOf(RouterosException)

      routeros.destroy()
    })
  })

  describe('Invalid host', () => {
    it('should throw timeout RouterosException when host is unreachable', async () => {
      const routeros = await createRouteros({
        host: '192.168.200.1',
        timeout: 5,
      })

      await expect(routeros.connect()).rejects.toMatchObject({
        name: 'RouterosException',
        message: 'Socket timeout',
      })

      routeros.destroy()
    }, 6000)
  })

  it('should throw RouterosException when user is invalid', async () => {
    const routeros = await createRouteros({ user: 'wrong' })

    await expect(routeros.connect()).rejects.toBeInstanceOf(RouterosException)

    routeros.destroy()
  })
})
