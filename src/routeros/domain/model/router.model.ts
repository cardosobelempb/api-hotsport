import { UUIDVO } from '@/common'

export interface RouterModel {
  id: UUIDVO
  name: string
  port: number
  username: string
  password: string
  host: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}

export interface HotspotServerProfileModel {
  name: string
  interface: string
  addressHotsport?: string
  dnsName: string
  htmlDirectory?: string
  rateLimit?: string
  comment?: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}
