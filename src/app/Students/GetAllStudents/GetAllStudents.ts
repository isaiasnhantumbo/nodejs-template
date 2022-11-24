import { StudentDto } from "./../../dtos/StudentDto";
import { Student } from "./../../../domain/Student";
import { IStudentRepository } from "../../interfaces/IStudentRepository";
import { Request, Response } from "express";

import { inject, injectable, container } from "tsyringe";
import { mapper } from "../../helpers/mappings/mapper";
@injectable()
export class GetAllStudents {
  constructor(
    @inject("StudentRepository")
    private studentsRepository: IStudentRepository
  ) {}
  async handle(): Promise<StudentDto[]> {
    const students = await this.studentsRepository.findAll();
    return mapper.mapArray(students, Student, StudentDto);
  }
}
