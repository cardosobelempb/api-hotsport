import { BadRequestError, ErrorCode, UUIDVO } from '@/common'
import { HostStatus } from '@/routeros/domain/model'
import { HostRepository } from '@/routeros/domain/repositories/host.repository'
import { inject, injectable } from 'tsyringe'

export namespace CreateHostUseCase {
  export type Input = {
    macAddress: string
    address: string
    toAddress: string
    server: string
    comment: string
    user: string
    status: HostStatus
  }

  export type Output = {
    id: UUIDVO
    macAddress: string
    address: string
    toAddress: string
    server: string
    comment: string
    user: string
    status: HostStatus
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
  }

  @injectable()
  export class UseCase {
    constructor(
      @inject('HostRepository')
      private readonly hostRepository: HostRepository,
    ) {}

    async execute(input: Input): Promise<Output> {
      if (!input.address) {
        throw new BadRequestError(ErrorCode.BAD_REQUEST)
      }

      await this.hostRepository.ensureNameIsUnique(input.address)

      const hostModel = this.hostRepository.create(input)
      await this.hostRepository.insert(hostModel)

      return {
        id: hostModel.id,
        macAddress: hostModel.macAddress,
        address: hostModel.address,
        toAddress: hostModel.toAddress,
        server: hostModel.server,
        comment: hostModel.comment,
        user: hostModel.user,
        status: hostModel.status,
        createdAt: hostModel.createdAt,
        updatedAt: hostModel.updatedAt,
        deletedAt: hostModel.deletedAt,
      }
    }
  }
}
