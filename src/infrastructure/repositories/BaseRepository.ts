import {
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from "typeorm";

import { BaseEntity } from "./../../domain/BaseEntity";
import { IBaseEntity } from "../../app/interfaces/IBaseEntity";
import { IGenericRepository } from "../../app/interfaces/IGenericRepository";
import { AppDataSource } from "../../persistence/data-source";
import { AppError } from "../../shared/errors/AppError";

export abstract class BaseRepository<
  // Class representing TypeORM model
  Entity extends BaseEntity
> implements IGenericRepository<Entity>
{
  constructor(private readonly classFn: new () => Entity) {}

  protected getRepository(): Repository<Entity> {
    return AppDataSource.getRepository<Entity>(this.classFn);
  }
  protected execute<P>(fn: (repo: Repository<Entity>) => Promise<P>) {
    try {
      const repo = this.getRepository();
      return fn(repo);
    } catch (err: any) {
      throw new AppError(err.message);
    }
  }
  async findOneBy(options: FindOneOptions<Entity>): Promise<Entity | null> {
    return await this.execute((repo) => repo.findOne(options));
  }
  async findManyBy(
    options: FindManyOptions<Entity>
  ): Promise<Entity[] | undefined> {
    return await this.execute((repo) => repo.find(options));
  }
  async findAll(): Promise<Entity[]> {
    return await this.execute((repo) => repo.find());
  }
  async delete(options: FindOptionsWhere<Entity>): Promise<DeleteResult> {
    return await this.execute((repo) => repo.delete(options));
  }
  async create(entity: Entity): Promise<Entity> {
    const now = new Date();

    return await this.execute((repo) =>
      repo.save({
        ...entity,
        date_created: now,
        date_updated: now,
      })
    );
  }
  async findAndCountBy(
    options: FindOptionsWhere<Entity>
  ): Promise<[Entity[], number]> {
    return await this.execute((repo) => repo.findAndCountBy(options));
  }
  async update(entity: Entity): Promise<Entity> {
    const now = new Date();
    return await this.execute((repo) =>
      repo.save({
        ...entity,
        date_updated: now,
      })
    );
  }
}
