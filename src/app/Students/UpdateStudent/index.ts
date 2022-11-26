import { StudentDto } from "../../dtos/StudentDto";
import { Student } from "../../../domain/Student";
import { IStudentRepository } from "../../interfaces/IStudentRepository";
import { Body } from "tsoa";

import { Request, Response } from "express";
import { inject, injectable, container } from "tsyringe";
import { AppError, BadRequestError } from "../../../shared/errors/AppError";
import { mapper } from "../../helpers/mappings/mapper";
import { ICreateStudent } from "../../@types/ICreateStudent";
@injectable()
export class UpdateStudent {
  constructor(
    @inject("StudentRepository")
    private studentsRepository: IStudentRepository
  ) {}
  async handle(id: number, data: ICreateStudent): Promise<StudentDto> {
    const { name } = data;
    const student = await this.studentsRepository.findOneBy({
      where: {
        id,
      },
    });
    if (!student) {
      throw new AppError("Student not Exist", 400);
    }
    student.name = name;
    await this.studentsRepository.update(student);
    return mapper.map(student, Student, StudentDto);
  }
}
