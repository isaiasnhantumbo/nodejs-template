
import { inject, injectable } from "tsyringe";

import { Student } from "../../../domain/Student";
import { AppError, BadRequestError } from "../../../shared/errors/AppError";
import { ICreateStudent } from "../../@types/ICreateStudent";
import { StudentDto } from "../../dtos/StudentDto";
import { mapper } from "../../helpers/mappings/mapper";
import { IStudentRepository } from "../../interfaces/IStudentRepository";
@injectable()
export class CreateStudent {
  constructor (
    @inject("StudentRepository")
    private readonly studentsRepository: IStudentRepository
  ) {}

  async handle (data: ICreateStudent): Promise<StudentDto> {
    const { name } = data;
    if (name.length === 0) {
      throw new BadRequestError("The field name is required");
    }
    const studentAlreadyExist = await this.studentsRepository.findOneBy({
      where: {
        name
      }
    });
    if (studentAlreadyExist != null) {
      throw new AppError("Student Exist", 409);
    }
    const student = new Student();
    student.name = name;
    await this.studentsRepository.create(student);
    return mapper.map(student, Student, StudentDto);
  }
}
