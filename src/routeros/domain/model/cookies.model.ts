import { UUIDVO } from '@/common'
import { UserStatus } from './status.enum'

export interface CookiesModel {
  id: UUIDVO
  user: string
  macAddress: string
  domain: string
  expired: string
  status: UserStatus
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}
