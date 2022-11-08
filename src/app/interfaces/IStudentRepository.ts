import { Student } from "../../domain/Student";
import { IGenericRepository } from "./IGenericRepository";

export interface IStudentRepository extends IGenericRepository<Student> {
  findByName(name: string): Promise<Student>;
}
