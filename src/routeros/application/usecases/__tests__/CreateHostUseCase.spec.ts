import { HostStatus } from '@/routeros/domain/model'
import { HostInMemoryRepository } from '@/routeros/infrastructure/memory/repositories/host-in-memory-repository'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { CreateHostUseCase } from '../create-host.usecase'

describe('CreateHostUseCase', () => {
  let sut: CreateHostUseCase.UseCase
  let hostInMemoryRepository: HostInMemoryRepository

  beforeEach(() => {
    hostInMemoryRepository = new HostInMemoryRepository()
    sut = new CreateHostUseCase.UseCase(hostInMemoryRepository)
  })
  it('should be create a host', async () => {
    const spyHostRepository = vi.spyOn(hostInMemoryRepository, 'insert')
    const input: CreateHostUseCase.Input = {
      macAddress: '00:11:22:33:44:55',
      address: '192.168.1.100',
      toAddress: '',
      server: 'server1',
      comment: 'Test host',
      user: 'testuser',
      status: HostStatus.OFFLINE,
    }
    const result = await sut.execute(input)

    expect(result).toBeDefined()
    expect(result.id.getValue()).toBeDefined()
    expect(result.macAddress).toBe(input.macAddress)
    expect(result.address).toBe(input.address)
    expect(result.toAddress).toBe(input.toAddress)
    expect(result.server).toBe(input.server)
    expect(result.comment).toBe(input.comment)
    expect(result.user).toBe(input.user)
    expect(result.status).toBe(input.status)
    expect(spyHostRepository).toHaveBeenCalled()
    expect(spyHostRepository).toHaveBeenCalledTimes(1)
  })
})
