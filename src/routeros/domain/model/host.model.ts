import { UUIDVO } from '@/common'

import { HostStatus } from './status.enum'

export interface HostModel {
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
