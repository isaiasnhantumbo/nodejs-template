import { Student } from "./../../../domain/Student";
import { mapper } from "../../helpers/mappings/mapper";
import { IStudentRepository } from "../../interfaces/IStudentRepository";
import { Request, Response } from "express";

import { inject, injectable, container } from "tsyringe";
import { StudentDto } from "../../dtos/StudentDto";
import { NotFoundError } from "../../../shared/errors/AppError";
@injectable()
export class GetStudentById {
  constructor(
    @inject("StudentRepository")
    private studentsRepository: IStudentRepository
  ) {}
  async handle(id: number): Promise<StudentDto> {
    const student = await this.studentsRepository.findOneBy({
      where: { id },
    });

    if (student === null) {
      throw new NotFoundError("Student not Found");
    }
    return mapper.map(student, Student, StudentDto);
  }
}
