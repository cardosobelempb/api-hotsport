import { ConflictError, ErrorCode, NotFoundError, SearchInput, SearchOutput } from '@/common'
import { HostModel } from '@/routeros/domain/model'
import { HostId, HostRepository } from '@/routeros/domain/repositories/host.repository'
import { inject, injectable } from 'tsyringe'
import { FindManyOptions, ILike, In, Repository } from 'typeorm'

import { HostTypeormEntity } from '../entities/host-typeorm.entity'

@injectable()
export class HostsTypeormRepository implements HostRepository {
  sortableFields: string[] = ['name', 'created_at']

  constructor(
    @inject('HostsDefaultTypeormRepository')
    private hostRepository: Repository<HostTypeormEntity>,
  ) {}

  create(entity: HostTypeormEntity): HostTypeormEntity {
    return this.hostRepository.create(entity)
  }
  async insert(entity: HostTypeormEntity): Promise<HostTypeormEntity> {
    return this.hostRepository.save(entity)
  }
  async findByName(name: string): Promise<HostTypeormEntity> {
    const host = await this.hostRepository.findOneBy({ name })
    if (!host) {
      throw new NotFoundError(
        `${ErrorCode.ENTITY_NOT_FOUND} using name: ${name}`,
      )
    }

    return host
  }
  async findAllByIds(hostIds: HostId[]): Promise<HostTypeormEntity[]> {
    const ids = hostIds.map(host => host.id.getValue())
    const hostsFound = await this.hostRepository.find({
      where: { id: In(ids) },
    })
    return hostsFound
  }
  async ensureNameIsUnique(name: string): Promise<void> {
    const host = await this.hostRepository.findOneBy({ name })
    if (host) {
      throw new ConflictError(`${ErrorCode.CONFLICT_ERROR} using name: ${name}`)
    }
  }
  async findById(id: string): Promise<HostTypeormEntity | null> {
    return this._get(id)
  }
  async save(entity: HostTypeormEntity): Promise<HostTypeormEntity> {
    return this.hostRepository.save(entity)
  }
  async update(entity: HostTypeormEntity): Promise<HostTypeormEntity> {
    await this._get(entity.id.getValue())
    await this.hostRepository.update({ id: entity.id.getValue() }, entity)
    return entity
  }
  async delete(entity: HostTypeormEntity): Promise<void> {
    await this._get(entity.id.getValue())
    this.hostRepository.delete({ id: entity.id.getValue() })
  }

  async search({
    filter,
    page = 1,
    perPage = 15,
    sortBy = 'created_at',
    sortDirection = 'desc',
  }: SearchInput): Promise<SearchOutput<HostModel>> {
    const currentPage = page > 0 ? page : 1
    const limit = perPage > 0 ? perPage : 15

    const normalizedSortDirection = sortDirection.toLowerCase()
    const allowedDirections: Array<'asc' | 'desc'> = ['asc', 'desc']

    const orderDirection: 'asc' | 'desc' = allowedDirections.includes(
      normalizedSortDirection as any,
    )
      ? (normalizedSortDirection as 'asc' | 'desc')
      : 'desc'

    const orderBy =
      sortBy && this.sortableFields.includes(sortBy) ? sortBy : 'created_at'

    const findOptions: FindManyOptions<HostTypeormEntity> = {
      order: {
        [orderBy]: orderDirection,
      },
      skip: (currentPage - 1) * limit,
      take: limit,
    }

    // Só adiciona o `where` se houver filtro
    if (filter) {
      findOptions.where = {
        name: ILike(`%${filter}%`),
      }
    }

    const [items, total] = await this.hostRepository.findAndCount(findOptions)

    return {
      items,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage,
      perPage: limit,
      sortBy: orderBy,
      sortDirection: orderDirection,
      filter: filter ?? null,
    }
  }

  protected async _get(id: string): Promise<HostTypeormEntity | null> {
    const host = await this.hostRepository.findOneBy({ id })
    if (!host) {
      throw new NotFoundError(`${ErrorCode.ENTITY_NOT_FOUND} using Id: ${id}`)
    }

    return host
  }
}
