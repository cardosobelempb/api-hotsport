import { CreateHostUseCase } from '@/routeros/application/usecases/create-host.usecase'
import { HostTypeormEntity } from '@/routeros/infrastructure/typeorm/entities/host-typeorm.entity'
import { HostsTypeormRepository } from '@/routeros/infrastructure/typeorm/repositories/host-typeorm-repository.entity'
import { container } from 'tsyringe'

import { dataSource } from '../typeorm'

container.registerSingleton('HostRepository', HostsTypeormRepository)
container.registerSingleton('CreateHostUseCase', CreateHostUseCase.UseCase)
container.registerInstance(
  'HostsDefaultTypeormRepository',
  dataSource.getRepository(HostTypeormEntity),
)
