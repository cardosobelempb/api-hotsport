import { describe, expect, it } from 'vitest'

import RouterosException from '../RouterosException'
import { createRouteros } from './helpers/routeros.helper'

describe('Hotspot User CRUD (Integration)', () => {
  it('should create, update, find and delete hotspot user successfully', async () => {
    const routeros = await createRouteros()

    try {
      const client = await routeros.connect()

      const createResult = await client.write([
        '/ip/hotspot/user/add',
        '=name=reza',
      ])

      const userId = createResult[0]?.ret

      if (!userId) {
        throw new Error('Hotspot user creation failed')
      }

      await client.write([
        '/ip/hotspot/user/set',
        `=.id=${userId}`,
        '=password=reza',
      ])

      const findResult = await client.write([
        '/ip/hotspot/user/print',
        `?.id=${userId}`,
      ])

      const [user] = findResult

      if (!user) {
        throw new Error('Hotspot user not found')
      }

      expect(user['.id']).toBe(userId)
    } finally {
      await routeros
    }
  }, 10000)
  it('should throw when creating user with existing name', async () => {
    const routeros = await createRouteros()

    try {
      const client = await routeros.connect()

      await client.write(['/ip/hotspot/user/add', '=name=reza'])

      await expect(
        client.write(['/ip/hotspot/user/add', '=name=reza']),
      ).rejects.toMatchObject({
        name: 'RouterosException',
        message: expect.stringContaining('already'),
      })
    } finally {
      routeros.destroy()
    }
  })

  it('should throw when updating non existing user', async () => {
    const routeros = await createRouteros()

    try {
      const client = await routeros.connect()

      await expect(
        client.write(['/ip/hotspot/user/set', '=.id=*9999999', '=name=test']),
      ).rejects.toBeInstanceOf(RouterosException)
    } finally {
      routeros.destroy()
    }
  })

  it('should throw when removing non existing user', async () => {
    const routeros = await createRouteros()

    try {
      const client = await routeros.connect()

      await expect(
        client.write(['/ip/hotspot/user/remove', '=.id=*9999999']),
      ).rejects.toBeInstanceOf(RouterosException)
    } finally {
      routeros.destroy()
    }
  })
})
