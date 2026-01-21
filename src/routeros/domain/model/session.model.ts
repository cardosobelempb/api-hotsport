import { UUIDVO } from '@/common'
import { SessionStatus } from './status.enum'

export interface SessionModel {
  id: UUIDVO
  name: string
  ip: number
  username: string
  password: string
  status: SessionStatus
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}
