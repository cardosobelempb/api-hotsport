import { IRepositorySoftDeletable } from './IRepositorySoftDeletable'
import { RepositorySoftDelete } from './RepositorySoftDeletable'
import { SearchInput, SearchOutput } from './RespositorySearch'

/**
 * Repositório com busca paginada e soft delete.
 */
export abstract class RepositorySearchableSoftDelete<
  TEntity extends IRepositorySoftDeletable,
> extends RepositorySoftDelete<TEntity> {
  /**
   * Busca entidades ativas por padrão.
   *
   * ⚠️ Não deve retornar registros com deletedAt != null
   */
  abstract search(params: SearchInput): Promise<SearchOutput<TEntity>>
}
