// domain/entities/host.entity.ts

import { EntityDomain, UUIDVO } from '@/common'
import { Optional } from '@/common/domain/common'

import { HostModel, HostStatus } from '../model'

export class HostEntity extends EntityDomain<HostModel> {
  /* =======================
   * Getters
   * ======================= */

  get id(): UUIDVO {
    return this.props.id
  }

  get address(): string {
    return this.props.address
  }

  get comment(): string {
    return this.props.comment
  }

  get macAddress(): string {
    return this.props.macAddress
  }

  get server(): string {
    return this.props.server
  }

  get status(): HostStatus {
    return this.props.status
  }

  get toAddress(): string {
    return this.props.toAddress
  }
  get user(): string {
    return this.props.user
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date {
    return this.props.updatedAt
  }

  get deletedAt(): Date | null {
    return this.props.deletedAt
  }

  /* =======================
   * Regras de negócio
   * ======================= */

  updateComment(comment: string): void {
    this.props.comment = comment
    this.touch()
  }

  updateMacAddress(macAddress: string): void {
    this.props.macAddress = macAddress
    this.touch()
  }

  updateServer(server: string): void {
    this.props.server = server
    this.touch()
  }

  updateStatus(status: HostStatus): void {
    this.props.status = status
    this.touch()
  }

  updateToAddress(toAddress: string): void {
    this.props.toAddress = toAddress
    this.touch()
  }

  updateUser(user: string): void {
    this.props.user = user
    this.touch()
  }

  updateAddress(address: string): void {
    this.props.address = address
    this.touch()
  }

  softDelete(): void {
    if (this.props.deletedAt) {
      throw new Error('Produto já está deletado')
    }

    this.props.deletedAt = new Date()
    this.touch()
  }

  /* =======================
   * Métodos internos
   * ======================= */

  private touch(): void {
    this.props.updatedAt = new Date()
  }

  /* =======================
   * Fábricas
   * ======================= */

  static create(
    props: Optional<
      HostModel,
      'status' | 'createdAt' | 'updatedAt' | 'deletedAt'
    >,
    id?: UUIDVO,
  ) {
    const hostEntity = new HostEntity(
      {
        ...props,
        status: props.status ?? HostStatus.OFFLINE,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
        deletedAt: props.deletedAt ?? null,
      },
      id,
    )

    return hostEntity
  }
}
