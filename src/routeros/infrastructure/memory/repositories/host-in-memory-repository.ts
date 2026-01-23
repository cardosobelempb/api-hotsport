import {
  ConflictError,
  ErrorCode,
  NotFoundError,
  RepositoryInMemory,
  RepositorySearchable,
} from '@/common'
import { HostModel } from '@/routeros/domain/model'
import { HostId } from '@/routeros/domain/repositories/host.repository'

export class HostInMemoryRepository
  extends RepositoryInMemory<HostModel>
  implements RepositorySearchable<HostModel, HostId>
{
  protected sortableFields: (keyof HostModel)[] = ['createdAt']

  async findByName(name: string): Promise<HostModel> {
    const host = this.items.find(item => item.address === name)
    if (!host) {
      throw new NotFoundError(`${ErrorCode.NOT_FOUND} ${name}`)
    }
    return host
  }
  async findAllByIds(hostIds: HostId[]): Promise<HostModel[]> {
    // Converte os IDs para um Set para busca eficiente
    const ids = new Set(hostIds.map(hostId => hostId.id))

    // Filtra apenas os produtos existentes
    return this.items.filter(item => ids.has(item.id))
  }
  async ensureNameIsUnique(name: string): Promise<void> {
    const host = this.items.find(item => item.address === name)
    if (host) {
      throw new ConflictError(`${ErrorCode.CONFLICT_ERROR} ${name}`)
    }
  }
  protected async applyFilter(
    items: HostModel[],
    filter?: string
  ): Promise<HostModel[]> {
    if (!filter) return items
    return items.filter(item =>
      item.address.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    )
  }

  protected applySort(
    items: HostModel[],
    sortBy?: keyof HostModel | undefined,
    sortDirection?: 'asc' | 'desc'
  ): HostModel[] {
    return super.applySort(
      items,
      sortBy ?? 'createdAt',
      sortDirection ?? 'desc'
    )
  }
}
