import { describe, expect, it } from 'vitest'
import Routeros from '../Routeros'
import RouterosException from '../RouterosException'
import routerosConfig from '../routeros.config'

const credential = {
  host: routerosConfig.routeros.host,
  port: routerosConfig.routeros.port,
  user: routerosConfig.routeros.user,
  password: routerosConfig.routeros.password,
}

let id: string = ''

describe('CREATE', () => {
  it('create success should return array of object with ret property', async () => {
    const routeros = new Routeros(credential)

    return routeros
      .connect()
      .then(client => client.write(['/ip/hotspot/user/add', '=name=reza']))
      .then(res => {
        expect(res[0]).toMatchObject({ ret: expect.stringContaining('*') })
        id = res[0]?.ret as string
      })
      .finally(() => routeros.destroy())
  })

  it('create with existis name should throw', async () => {
    const routeros = new Routeros(credential)

    return routeros
      .connect()
      .then(client => client.write(['/ip/hotspot/user/add', '=name=reza']))
      .catch(err => {
        expect(err).toBeInstanceOf(RouterosException)
        expect(err.message).toEqual(expect.stringContaining('already'))
      })
      .finally(() => routeros.destroy())
  })
})

describe('UPDATE', () => {
  it('update success should return empty array', async () => {
    const routeros = new Routeros(credential)

    return routeros
      .connect()
      .then(client =>
        client.write(['/ip/hotspot/user/set', `=.id=${id}`, '=password=reza']),
      )
      .then(res => {
        expect(Array.isArray(res)).toBe(true)
        expect(res.length === 0).toBe(true)
      })
      .finally(() => routeros.destroy())
  })

  it('update with wrong id should throw', async () => {
    const routeros = new Routeros(credential)

    return routeros
      .connect()
      .then(client =>
        client.write(['/ip/hotspot/user/set', '=.id=*9999999', '=name=test']),
      )
      .catch(err => {
        expect(err).toBeInstanceOf(RouterosException)
      })
      .finally(() => routeros.destroy())
  })
})

describe('FIND', () => {
  it('find with existing id should return array of object', async () => {
    const routeros = new Routeros(credential)

    return routeros
      .connect()
      .then(client => client.write(['/ip/hotspot/user/print', `?.id=${id}`]))
      .then(res => {
        expect(Array.isArray(res)).toBe(true)
        expect(res.length === 1).toBe(true)
        expect(res[0]['.id']).toEqual(id)
      })
      .finally(() => {
        routeros.destroy()
      })
  })
})

describe('DELETE', () => {
  it('remove with not existing id shoud throw', async () => {
    const routeros = new Routeros(credential)

    return routeros
      .connect()
      .then(client =>
        client.write(['/ip/hotspot/user/remove', '=.id=*9999999']),
      )
      .catch(err => {
        expect(err).toBeInstanceOf(RouterosException)
      })
      .finally(() => {
        routeros.destroy()
      })
  })

  it('remove with existing id shoud retrun empty array', async () => {
    const routeros = new Routeros(credential)

    return routeros
      .connect()
      .then(client => client.write(['/ip/hotspot/user/remove', `=.id=${id}`]))
      .then(res => {
        expect(Array.isArray(res)).toBe(true)
        expect(res.length === 0).toBe(true)
      })
      .finally(() => {
        routeros.destroy()
      })
  })
})
