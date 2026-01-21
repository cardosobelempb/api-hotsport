import { UUIDVO } from '@/common'
import { SettingsStatus } from './status.enum'

export interface SettingModel {
  id: UUIDVO
  name: string
  dns: number
  currency: string
  autoRecharge: number
  downtime: number
  trafficInterface: number
  realTimeReport: boolean
  status: SettingsStatus
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}
