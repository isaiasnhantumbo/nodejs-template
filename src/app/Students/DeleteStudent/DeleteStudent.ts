import { Student } from "./../../../domain/Student";
import { mapper } from "../../helpers/mappings/mapper";
import { IStudentRepository } from "../../interfaces/IStudentRepository";
import { Request, Response } from "express";

import { inject, injectable, container } from "tsyringe";
import { StudentDto } from "../../dtos/StudentDto";
@injectable()
export class DeleteStudent {
  constructor(
    @inject("StudentRepository")
    private studentsRepository: IStudentRepository
  ) {}
  async handle(id: string): Promise<boolean> {
    const student = await this.studentsRepository.delete(id);
    return student;
  }
}
