import { AutoMap } from "@automapper/classes"
import { Column, PrimaryGeneratedColumn } from "typeorm"

import { IBaseEntity } from "./../app/interfaces/IBaseEntity"

export class BaseEntity implements IBaseEntity {
  /**
   * Unique Identifier
   */
  @PrimaryGeneratedColumn()
  @AutoMap()
  public id!: number

  /**
   * Date of creation
   */
  @Column({
    nullable: true,
    type: "timestamp",
    default: new Date()
  })
  public date_created: Date

  /**
   * Date of update
   */
  @Column({ nullable: true, type: "timestamp", default: new Date() })
  public date_updated: Date
}
