import { HostStatus } from '@/routeros/domain/model'
import { z } from 'zod'

export const createHostBodySchema = z.object({
  macAddress: z
    .string()
    .min(1, 'macAddress is required')
    .regex(
      /^([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}$/,
      'macAddress must be a valid MAC address',
    ),

  address: z.string().min(1, 'address is required'),

  toAddress: z.string().optional(),

  server: z.string().min(1, 'server is required'),

  comment: z.string().optional(),

  user: z.string().min(1, 'user is required'),

  status: z.enum(HostStatus, {
    message: 'status must be ONLINE or OFFLINE',
  }),
})
