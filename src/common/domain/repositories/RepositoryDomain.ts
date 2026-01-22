/**
 * Contrato base de persistência.
 */
export abstract class RepositoryDomain<TEntity, TCreaeteProps> {
  /**
   * Busca uma entidade pelo ID.
   */
  abstract findById(id: string): Promise<TEntity | null>

  /**
   * Persiste uma entidade (create ou update).
   */
  abstract save(entity: TEntity): Promise<TEntity>
  abstract save(entity: TEntity): Promise<TEntity>
  abstract update(entity: TEntity): Promise<TEntity>
  abstract create(entity: TCreaeteProps): TEntity
  abstract insert(entity: TEntity): Promise<TEntity>

  /**
   * Remove fisicamente a entidade da base.
   *
   * ⚠️ Uso restrito e consciente.
   */
  abstract delete(entity: TEntity): Promise<void>
}
