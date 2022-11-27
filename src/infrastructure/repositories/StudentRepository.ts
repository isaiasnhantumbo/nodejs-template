import { Student } from "../../domain/Student"
import { IStudentRepository } from "./../../app/interfaces/IStudentRepository"
import { BaseRepository } from "./BaseRepository"

export class StudentRepository
  extends BaseRepository<Student>
  implements IStudentRepository {
  constructor () {
    super(Student)
  }

  async getAllStudentsWithoutAddress () {
    return await this.execute(async (repo) => await repo.find({ where: { address: "null" } }))
  }
}
