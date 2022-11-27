import {
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository
} from "typeorm"

import { IGenericRepository } from "../../app/interfaces/IGenericRepository"
import { AppDataSource } from "../../persistence/data-source"
import { AppError } from "../../shared/errors/AppError"
import { BaseEntity } from "./../../domain/BaseEntity"

export abstract class BaseRepository<
  // Class representing TypeORM model
  Entity extends BaseEntity
> implements IGenericRepository<Entity> {
  constructor (private readonly classFn: new () => Entity) {}

  protected getRepository (): Repository<Entity> {
    return AppDataSource.getRepository<Entity>(this.classFn)
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  protected async execute<P>(fn: (repo: Repository<Entity>) => Promise<P>) {
    try {
      const repo = this.getRepository()
      return await fn(repo)
    } catch (err: any) {
      throw new AppError(err.message)
    }
  }

  async findOneBy (options: FindOneOptions<Entity>): Promise<Entity | null> {
    return await this.execute(async (repo) => await repo.findOne(options))
  }

  async findManyBy (
    options: FindManyOptions<Entity>
  ): Promise<Entity[] | undefined> {
    return await this.execute(async (repo) => await repo.find(options))
  }

  async findAll (): Promise<Entity[]> {
    return await this.execute(async (repo) => await repo.find())
  }

  async delete (options: FindOptionsWhere<Entity>): Promise<DeleteResult> {
    return await this.execute(async (repo) => await repo.delete(options))
  }

  async create (entity: Entity): Promise<Entity> {
    const now = new Date()

    return await this.execute(async (repo) =>
      await repo.save({
        ...entity,
        date_created: now,
        date_updated: now
      })
    )
  }

  async findAndCountBy (
    options: FindOptionsWhere<Entity>
  ): Promise<[Entity[], number]> {
    return await this.execute(async (repo) => await repo.findAndCountBy(options))
  }

  async update (entity: Entity): Promise<Entity> {
    const now = new Date()
    return await this.execute(async (repo) =>
      await repo.save({
        ...entity,
        date_updated: now
      })
    )
  }
}
