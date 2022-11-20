import { StudentDto } from './../../dtos/StudentDto';
import { Student } from "./../../../domain/Student";
import { IStudentRepository } from "./../../interfaces/IStudentRepository";

import { Request, Response } from "express";
import { inject, injectable, container } from "tsyringe";
import { AppError } from "../../../shared/errors/AppError";
import { mapper } from '../../helpers/mappings/mapper';
@injectable()
class CreateStudent {
  constructor(
    @inject("StudentRepository")
    private studentsRepository: IStudentRepository
  ) {}
  async handle(req: Request, res: Response) {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "O nome e obrigatório" });
    }
    try {
      const studentExist = await this.studentsRepository.findByName(name);
      if (studentExist) {
        throw new AppError("Student Exist", 409);

        // return res.status(409).json({ message: "Student Exist" });
      }
      const student = new Student();
      student.name = name;
      await this.studentsRepository.create(student);
      return res.status(201).json(mapper.map(student, Student, StudentDto));
    } catch (error:any) {
      console.log(error);
      return res.status(error.statusCode).json({ message: error.message });
    }
  }
}

export const createStudent = container.resolve(CreateStudent);
