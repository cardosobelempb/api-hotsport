import { dataSource } from '@/common/infrastructure/typeorm'
import { CreateHostUseCase } from '@/routeros/application/usecases/create-host.usecase'
import { GetHostUseCase } from '@/routeros/application/usecases/get-host.usecase'
import { HostTypeormEntity } from '@/routeros/infrastructure/typeorm/entities/host-typeorm.entity'
import { HostsTypeormRepository } from '@/routeros/infrastructure/typeorm/repositories/host-typeorm-repository.entity'
import { container } from 'tsyringe'

container.registerSingleton('HostRepository', HostsTypeormRepository)
container.registerSingleton('CreateHostUseCase', CreateHostUseCase.UseCase)
container.registerSingleton('GetHostUseCase', GetHostUseCase.UseCase)
container.registerInstance(
  'HostsDefaultTypeormRepository',
  dataSource.getRepository(HostTypeormEntity)
)
