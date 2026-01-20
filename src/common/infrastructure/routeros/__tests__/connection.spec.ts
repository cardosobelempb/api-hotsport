import { describe, expect, it } from 'vitest'
import RouterosClient from '../Routeros'
import Routeros from '../Routeros'
import RouterosException from '../RouterosException'
import routerosConfig from '../routeros.config'

describe('Connection', () => {
  it('when correct credential should return instance', async () => {
    const routeros = new Routeros({
      host: routerosConfig.routeros.host,
      port: routerosConfig.routeros.port,
      user: routerosConfig.routeros.user,
      password: routerosConfig.routeros.password,
    })

    // console.log(await routeros.write(['/ip/hotspot/user/add', '=name=reza']))

    return routeros
      .connect()
      .then(client => {
        console.log(client.write(['/ip/hotspot/user/print']))
        expect(client).toBeInstanceOf(RouterosClient)
      })
      .finally(() => {
        routeros.destroy()
      })
  })

  describe('Wrong port', () => {
    it('port incorrect should thrown RouterosException with message', async () => {
      const routeros = new Routeros({
        host: routerosConfig.routeros.host,
        port: 8748,
        user: routerosConfig.routeros.user,
        password: routerosConfig.routeros.password,
      })

      return routeros
        .connect()
        .catch(error => {
          expect(error).toBeInstanceOf(RouterosException)
        })
        .finally(() => {
          routeros.destroy()
        })
    })

    it('port out of range should return out of range message', async () => {
      const routeros = new Routeros({
        host: routerosConfig.routeros.host,
        port: 87288,
        user: routerosConfig.routeros.user,
        password: routerosConfig.routeros.password,
      })

      return routeros
        .connect()
        .catch(error => {
          expect(error).toBeInstanceOf(RouterosException)
        })
        .finally(() => {
          routeros.destroy()
        })
    })
  })

  describe('Wrong host', () => {
    it('Wrong host with timeout should return RouterosException and timeout message', async () => {
      const routeros = new Routeros({
        host: '192.168.200.1',
        port: routerosConfig.routeros.port,
        user: routerosConfig.routeros.user,
        password: routerosConfig.routeros.password,
        timeout: 5,
      })

      return routeros
        .connect()
        .catch(error => {
          expect(error).toBeInstanceOf(RouterosException)
          expect(error.message).toBe('Socket timeout')
        })
        .finally(() => {
          routeros.destroy()
        })
    }, 6000)
  })

  it('wrong user show throw RouterosException', async () => {
    const routeros = new Routeros({
      host: routerosConfig.routeros.host,
      port: routerosConfig.routeros.port,
      user: 'wrong',
      password: routerosConfig.routeros.password,
    })

    return routeros
      .connect()
      .catch(error => {
        expect(error).toBeInstanceOf(RouterosException)
      })
      .finally(() => {
        routeros.destroy()
      })
  })
})
