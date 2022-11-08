export interface IGenericRepository<T> {
  create(entity: T): Promise<T>;
  findById(id: string): Promise<T>;
  find(): Promise<T[]>;
  update(entity: T): Promise<T>;
  delete(id: string): Promise<boolean>;
}
