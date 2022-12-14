import { inject, injectable } from "tsyringe";

import { StudentDto } from "../../dtos/StudentDto";
import { mapper } from "../../helpers/mappings/mapper";
import { IStudentRepository } from "../../interfaces/IStudentRepository";
import { Student } from "./../../../domain/Student";
import { BadRequestError } from "./../../../shared/errors/AppError";
@injectable()
export class DeleteStudent {
  constructor (
    @inject("StudentRepository")
    private readonly studentsRepository: IStudentRepository
  ) {}

  async handle (id: number): Promise<StudentDto> {
    const student = await this.studentsRepository.findOneBy({
      where: { id }
    });
    if (student === null) {
      throw new BadRequestError("Student not exist");
    }
    await this.studentsRepository.delete({ id });
    return mapper.map(student, Student, StudentDto);
  }
}
