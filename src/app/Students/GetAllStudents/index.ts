import { IStudentRepository } from "../../interfaces/IStudentRepository";
import { Request, Response } from "express";

import { inject, injectable,container } from "tsyringe";
@injectable()
class GetAllStudents {
  constructor(
    @inject("StudentRepository")
    private studentsRepository: IStudentRepository
  ) {}
  async handle(req: Request, res: Response) {
    try {
      const students = await this.studentsRepository.find();
      return res.status(201).json(students);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

export const getAllStudent = container.resolve(GetAllStudents);
