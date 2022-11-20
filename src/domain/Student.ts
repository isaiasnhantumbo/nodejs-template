import { AutoMap } from "@automapper/classes";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity("students")
export class Student {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;
  @Column({ type: "text" })
  @AutoMap()
  name: string;
}
