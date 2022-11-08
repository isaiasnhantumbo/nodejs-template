import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("students")
export class Student {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: "text" })
  name: string;
}
