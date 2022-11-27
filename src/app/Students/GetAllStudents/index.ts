import { inject, injectable } from "tsyringe";

import { Student } from "../../../domain/Student";
import { StudentDto } from "../../dtos/StudentDto";
import { mapper } from "../../helpers/mappings/mapper";
import { IStudentRepository } from "../../interfaces/IStudentRepository";

@injectable()
export class GetAllStudents {
  constructor (
    @inject("StudentRepository")
    private readonly studentsRepository: IStudentRepository
  ) {}

  async handle (): Promise<StudentDto[]> {
    const students = await this.studentsRepository.findAll();
    return mapper.mapArray(students, Student, StudentDto);
  }
}
