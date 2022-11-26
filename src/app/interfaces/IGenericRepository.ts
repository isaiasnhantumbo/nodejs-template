import {
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
} from "typeorm";

export interface IGenericRepository<T> {
  create(entity: T): Promise<T>;
  findOneBy(options: FindOneOptions<T>): Promise<T | null>;
  findManyBy(options: FindManyOptions<T>): Promise<T[] | undefined>;
  findAll(): Promise<T[]>;
  findAndCountBy(options: FindOptionsWhere<T>): Promise<[T[], number]>;
  update(entity: T): Promise<T>;
  delete(options: FindOptionsWhere<T>): Promise<DeleteResult>;
}
