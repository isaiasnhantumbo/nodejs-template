import { StudentDto } from "./../../dtos/StudentDto";
import { Student } from "./../../../domain/Student";
import { IStudentRepository } from "./../../interfaces/IStudentRepository";

import { Request, Response } from "express";
import { inject, injectable, container } from "tsyringe";
import { AppError, BadRequestError } from "../../../shared/errors/AppError";
import { mapper } from "../../helpers/mappings/mapper";
import { ICreateStudent } from "../../@types/ICreateStudent";
@injectable()
export class CreateStudent {
  constructor(
    @inject("StudentRepository")
    private studentsRepository: IStudentRepository
  ) {}
  async handle(data: ICreateStudent): Promise<StudentDto> {
    const { name } = data;
    if (!name) {
      throw new BadRequestError("The field name is required");
    }
    const studentAlreadyExist = await this.studentsRepository.findByName(name);
    if (studentAlreadyExist) {
      throw new AppError("Student Exist", 409);
    }
    const student = new Student();
    student.name = name;
    await this.studentsRepository.create(student);
    return mapper.map(student, Student, StudentDto);
  }
}
