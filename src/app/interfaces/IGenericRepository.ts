import { FindManyOptions, FindOneOptions, FindOptionsWhere,DeleteResult } from "typeorm";

export interface IGenericRepository<T> {
  create(entity: T): Promise<T>;
  findOneBy(options: FindOneOptions<T>): Promise<T | null>;
  findManyBy(options: FindManyOptions<T>): Promise<T[] | undefined>;
  findAll(): Promise<T[]>;
  update(entity: T): Promise<T>;
  delete(options: FindOptionsWhere<T>): Promise<DeleteResult>;
}
