import { HostStatus } from '@/routeros/domain/model'

import { CreateHostUseCase } from '../create-host.usecase'

export function makeValidCreateHostInput(
  overrides?: Partial<CreateHostUseCase.Input>,
): CreateHostUseCase.Input {
  return {
    macAddress: '00:11:22:33:44:55',
    address: '192.168.1.100',
    toAddress: '',
    server: 'server1',
    comment: 'Test host',
    user: 'testuser',
    status: HostStatus.OFFLINE,
    ...overrides, // permite customização em outros testes
  }
}
