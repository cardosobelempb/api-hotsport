import { UUIDVO } from '@/common'
import { HostEntity } from '@/routeros/domain/entities/host.entity'
import { HostModel, HostStatus } from '@/routeros/domain/model'

export function hostMake(override: Partial<HostModel> = {}) {
  const hostEntity = HostEntity.create({
    id: UUIDVO.create(),
    macAddress: '00:11:22:33:44:55',
    address: '192.168.1.100',
    toAddress: '',
    server: 'server1',
    comment: 'Test host',
    user: 'testuser',
    status: HostStatus.OFFLINE,
    ...override, // permite customização em outros testes
  })

  return hostEntity
}
