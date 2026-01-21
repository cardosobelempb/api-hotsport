import { UUIDVO } from '@/common'
import { UserStatus } from './status.enum'

export interface UserModel {
  id: UUIDVO
  server: string
  name: string
  password: string
  profileId: UUIDVO
  timeLimit?: string
  dataLimit?: string
  status: UserStatus
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}
