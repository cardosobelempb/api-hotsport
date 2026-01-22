# HostsTypeormRepository

Implementação do repositório de Hosts usando TypeORM.

## Responsabilidade

- Persistência de dados
- Busca e filtros
- Garantia de integridade (existência, unicidade)

Este repositório **não contém regras de negócio**, apenas regras de acesso a dados.

---

## Princípios Aplicados

- Dependency Inversion Principle (DIP)
- Single Responsibility Principle (SRP)
- Fail Fast
- Defensive Programming

---

## Campos Ordenáveis

```ts
sortableFields: string[] = ['name', 'created_at']
```

## Define uma whitelist de campos permitidos para ordenação, evitando:

- SQL Injection
- Erros por campos inexistentes

### Métodos CRUD

### 🟢 create

- Cria uma instância gerenciada da entidade sem persistir no banco.

```ts
create(entity: HostTypeormEntity): HostTypeormEntity {
  return this.hostRepository.create(entity)
}

```

### 🟢 insert

- Persiste uma nova entidade.

```ts
async insert(entity: HostTypeormEntity): Promise<HostTypeormEntity> {
    return this.hostRepository.save(entity)
  }

```

### 🟢 save

- Persiste alterações de uma entidade existente.

```ts
async save(entity: HostTypeormEntity): Promise<HostTypeormEntity> {
    return this.hostRepository.save(entity)
  }

```

### 🟢 update

- Atualiza a entidade após validar sua existência.

```ts
  async update(entity: HostTypeormEntity): Promise<HostTypeormEntity> {
    await this._get(entity.id.getValue())
    await this.hostRepository.update({ id: entity.id.getValue() }, entity)
    return entity
  }
```

### 🟢 delete

- Remove a entidade após validar sua existência.

```ts
async delete(entity: HostTypeormEntity): Promise<void> {
    await this._get(entity.id.getValue())
    this.hostRepository.delete({ id: entity.id.getValue() })
  }
```

### Métodos de Consulta

### 🟢 findById

- Busca entidade por ID, lançando erro se não existir.

```ts

async findById(id: string): Promise<HostTypeormEntity | null> {
    return this._get(id)
  }

```

### 🟢 findByName

- Busca entidade por nome, garantindo retorno válido.

```ts
async findByName(name: string): Promise<HostTypeormEntity> {
    const host = await this.hostRepository.findOneBy({ name })
    if (!host) {
      throw new NotFoundError(
        `${ErrorCode.ENTITY_NOT_FOUND} using name: ${name}`,
      )
    }

    return host
  }
```

### 🟢 findAllByIds

- Busca múltiplas entidades usando IN.

```ts
async findAllByIds(hostIds: HostId[]): Promise<HostTypeormEntity[]> {
    const ids = hostIds.map(host => host.id.getValue())
    const hostsFound = await this.hostRepository.find({
      where: { id: In(ids) },
    })
    return hostsFound
  }

```

Validações

### 🟢 ensureNameIsUnique

- Garante que não exista outra entidade com o mesmo nome.

```ts
async ensureNameIsUnique(name: string): Promise<void> {
    const host = await this.hostRepository.findOneBy({ name })
    if (host) {
      throw new ConflictError(`${ErrorCode.CONFLICT_ERROR} using name: ${name}`)
    }
  }

```

## Método Interno \_get

- Centraliza a validação de existência da entidade e evita duplicação de lógica.

```ts
protected async _get(id: string)
```

### Usado por:

- update
- delete
- findById
