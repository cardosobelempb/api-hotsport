// your.ts
import 'reflect-metadata'

import { BadRequestError, ConflictError } from '@/common'
import { HostRepository } from '@/routeros/domain/repositories/host.repository'
import { HostInMemoryRepository } from '@/routeros/infrastructure/memory/repositories/host-in-memory-repository'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { GetHostUseCase } from '../get-host.usecase'
import { hostMake } from '../make/host.make'

describe('GetHostUseCase', () => {
  let sut: GetHostUseCase.UseCase
  let hostRepository: HostRepository

  beforeEach(() => {
    hostRepository = new HostInMemoryRepository()
    sut = new GetHostUseCase.UseCase(hostRepository)
  })
  it('should get a host', async () => {
    // Arrange
    const findByIdSpy = vi.spyOn(hostRepository, 'findById')
    const input = hostMake()

    // Act
    const model = hostRepository.create(input)
    await hostRepository.insert(model)

    const result = await sut.execute({ id: model.id })
    // Assert
    expect(result).toMatchObject({
      macAddress: input.macAddress,
      address: input.address,
      toAddress: input.toAddress,
      server: input.server,
      comment: input.comment,
      user: input.user,
      status: input.status,
    })

    expect(result.id).toBeDefined()
    expect(findByIdSpy).toHaveBeenCalledTimes(1)
  })

  it.skip('should throw ConflictError when trying to register a host with an existing address', async () => {
    // Arrange
    const input = hostMake()

    // Act
    await sut.execute(input)

    // Assert
    await expect(sut.execute(input)).rejects.toBeInstanceOf(ConflictError)
  })

  it('should throw BadRequestError when address is empty', async () => {
    const input = hostMake({ address: '' })

    await expect(sut.execute(input)).rejects.toThrow(BadRequestError)
  })
})
