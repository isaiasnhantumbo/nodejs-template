import { AutoMap } from "@automapper/classes";
import { Column, Entity } from "typeorm";
import { ICreateStudent } from "../app/@types/ICreateStudent";
import { BaseEntity } from "./BaseEntity";


@Entity("students")
export class Student extends BaseEntity implements ICreateStudent {
  @Column({ type: "text" })
  @AutoMap()
  name: string;
  @Column({
    nullable: true,
    type: "text",
  })
  address?: string;
}
