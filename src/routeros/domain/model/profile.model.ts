import { UUIDVO } from '@/common'
import { ProfileStatus } from './status.enum'

export interface ProfileModel {
  id: UUIDVO
  name: string
  shared: number
  rateLimit: string
  expired: string
  validity: string
  price: number
  sellingPrice: number
  status: ProfileStatus
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}
