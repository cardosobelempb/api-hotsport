import { RepositorySearchable, UUIDVO } from '@/common'

import { HostModel } from '../model/host.model'
import { HostStatus } from '../model/status.enum'

export type HostId = {
  id: UUIDVO
}
export type HostCreateProps = {
  id?: UUIDVO
  macAddress: string
  address: string
  toAddress: string
  server: string
  comment: string
  user: string
  status: HostStatus
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}

export abstract class HostRepository extends RepositorySearchable<
  HostModel,
  HostCreateProps
> {
  abstract findByName(name: string): Promise<HostModel>
  abstract findAllByIds(hostIds: HostId[]): Promise<HostModel[]>
  abstract ensureNameIsUnique(name: string): Promise<void>
}
