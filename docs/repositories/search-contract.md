# Search Contract

- Define os contratos de **entrada** e **saída** para buscas paginadas.

### SearchInput

```ts
interface SearchInput {
  filter?: string
  page?: number
  perPage?: number
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
}
```

### Observações

- Campos opcionais (undefined)
- Nenhum campo aceita null
- SearchOutput

```ts
export type SearchOutput<Entity> = {
  items: Entity[]
  total: number
  totalPages: number
  currentPage: number
  perPage: number
  sortBy: string // opcional agora
  sortDirection?: 'asc' | 'desc'
  filter: string | null
}
```

Regra de ouro

Input pode ser opcional
Output deve ser explícito

# Justificativa

- Facilita integração com frontend
- Evita estados ambíguos
- Melhora previsibilidade da API
