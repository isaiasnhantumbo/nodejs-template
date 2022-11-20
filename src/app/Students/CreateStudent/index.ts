import { Student } from "./../../../domain/Student";
import { IStudentRepository } from "./../../interfaces/IStudentRepository";

import { Request, Response } from "express";
import { inject, injectable, container } from "tsyringe";
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
        // throw new AppError("Student Exist", 409);

        return res.status(409).json({ message: "Student Exist" });
      }
      const student = new Student();
      student.name = name;
      await this.studentsRepository.create(student);
      return res.status(201).json(student);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

export const createStudent = container.resolve(CreateStudent);
