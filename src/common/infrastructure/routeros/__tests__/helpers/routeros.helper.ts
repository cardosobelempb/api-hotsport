// test/helpers/routeros.helper.ts
import { RouterosClient } from '../../RouterosClient'

export async function createRouteros(overrides = {}) {
  const client = await new RouterosClient({
    host: '192.168.0.1',
    port: 8729,
    user: 'admin',
    password: 'admin',
    tlsOptions: {},
    ...overrides,
  })

  return client
}
