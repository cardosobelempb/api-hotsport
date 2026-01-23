import { BadRequestError, ConflictError } from '@/common'
import { HostInMemoryRepository } from '@/routeros/infrastructure/memory/repositories/host-in-memory-repository'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { CreateHostUseCase } from '../create-host.usecase'
import { makeValidCreateHostInput } from '../make/make-valid-create-host-input'

describe('CreateHostUseCase', () => {
  let sut: CreateHostUseCase.UseCase
  let hostInMemoryRepository: HostInMemoryRepository

  beforeEach(() => {
    hostInMemoryRepository = new HostInMemoryRepository()
    sut = new CreateHostUseCase.UseCase(hostInMemoryRepository)
  })
  it('should create a host', async () => {
    // Arrange
    const insertSpy = vi.spyOn(hostInMemoryRepository, 'insert')
    const input = makeValidCreateHostInput()

    // Act
    const host = await sut.execute(input)

    // Assert
    expect(host).toMatchObject({
      macAddress: input.macAddress,
      address: input.address,
      toAddress: input.toAddress,
      server: input.server,
      comment: input.comment,
      user: input.user,
      status: input.status,
    })

    expect(host.id).toBeDefined()
    expect(insertSpy).toHaveBeenCalledTimes(1)
  })

  it('should throw ConflictError when trying to register a host with an existing address', async () => {
    // Arrange
    const input = makeValidCreateHostInput()

    // Act
    await sut.execute(input)

    // Assert
    await expect(sut.execute(input)).rejects.toBeInstanceOf(ConflictError)
  })

  it('should throw BadRequestError when address is empty', async () => {
    const input = makeValidCreateHostInput({ address: '' })

    await expect(sut.execute(input)).rejects.toThrow(BadRequestError)
  })
})
