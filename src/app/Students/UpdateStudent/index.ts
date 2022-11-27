import { inject, injectable } from "tsyringe";

import { Student } from "../../../domain/Student";
import { AppError } from "../../../shared/errors/AppError";
import { ICreateStudent } from "../../@types/ICreateStudent";
import { StudentDto } from "../../dtos/StudentDto";
import { mapper } from "../../helpers/mappings/mapper";
import { IStudentRepository } from "../../interfaces/IStudentRepository";
@injectable()
export class UpdateStudent {
  constructor (
    @inject("StudentRepository")
    private readonly studentsRepository: IStudentRepository
  ) {}

  async handle (id: number, data: ICreateStudent): Promise<StudentDto> {
    const { name } = data;
    const student = await this.studentsRepository.findOneBy({
      where: {
        id
      }
    });
    if (student == null) {
      throw new AppError("Student not Exist", 400);
    }
    student.name = name;
    await this.studentsRepository.update(student);
    return mapper.map(student, Student, StudentDto);
  }
}
