import { IStudentRepository } from "./../../app/interfaces/IStudentRepository";
import { Student } from "../../domain/Student";
import { BaseRepository } from "./BaseRepository";

export class StudentRepository
  extends BaseRepository<Student>
  implements IStudentRepository
{
  constructor() {
    super(Student);
  }
  /**
   * getAllStudentsWithoutAdress
   */
   async getAllStudentsWithoutAddress() {
    return await this.execute((repo) => repo.find({ where: { address: "null" } }));
  }
}
