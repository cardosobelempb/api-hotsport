// src/infra/api.client.ts

export class ApiClient {
  async getIpPool(): Promise<unknown> {
    // Aqui você adapta para a lib real (axios, fetch, sdk etc)
    // Exemplo fictício:
    return await Promise.resolve({ data: 'pool-data' })
  }
}
