import { inject, injectable } from "tsyringe";

import { NotFoundError } from "../../../shared/errors/AppError";
import { StudentDto } from "../../dtos/StudentDto";
import { mapper } from "../../helpers/mappings/mapper";
import { IStudentRepository } from "../../interfaces/IStudentRepository";
import { Student } from "./../../../domain/Student";
@injectable()
export class GetStudentById {
  constructor (
    @inject("StudentRepository")
    private readonly studentsRepository: IStudentRepository
  ) {}

  async handle (id: number): Promise<StudentDto> {
    const student = await this.studentsRepository.findOneBy({
      where: { id }
    });

    if (student === null) {
      throw new NotFoundError("Student not Found");
    }
    return mapper.map(student, Student, StudentDto);
  }
}
