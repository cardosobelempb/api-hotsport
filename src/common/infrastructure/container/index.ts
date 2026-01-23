import { CreateHostUseCase } from '@/routeros/application/usecases/create-host.usecase'
import { HostsTypeormRepository } from '@/routeros/infrastructure/typeorm/repositories/host-typeorm-repository.entity'
import { container } from 'tsyringe'

container.registerSingleton('HostRepository', HostsTypeormRepository)
container.registerSingleton('CreateHostUseCase', CreateHostUseCase.UseCase)
