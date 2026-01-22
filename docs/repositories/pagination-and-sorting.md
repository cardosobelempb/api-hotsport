# Paginação e Ordenação

- Este documento descreve as regras padrão de paginação e ordenação usadas nos repositórios.

## Paginação

### 🟢 search

- busca paginada.

```ts
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

```

### Normalização

```ts
const currentPage = page > 0 ? page : 1
const limit = perPage > 0 ? perPage : 15
```

### Benefícios

- Evita valores inválidos
- Evita queries incorretas
- Padroniza comportamento

### Ordenação

- Direções permitidas

```ts
const allowedDirections: Array<'asc' | 'desc'> = ['asc', 'desc']
```

### Campo de ordenação seguro

```ts
const orderBy =
  sortBy && sortableFields.includes(sortBy) ? sortBy : 'created_at'
```

### Benefícios

- Segurança
- Previsibilidade
- Facilidade de manutenção
