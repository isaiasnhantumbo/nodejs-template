import { Student } from "./../../../domain/Student";
import { mapper } from "../../helpers/mappings/mapper";
import { IStudentRepository } from "../../interfaces/IStudentRepository";
import { Request, Response } from "express";

import { inject, injectable, container } from "tsyringe";
import { StudentDto } from "../../dtos/StudentDto";
@injectable()
class GetStudentById {
  constructor(
    @inject("StudentRepository")
    private studentsRepository: IStudentRepository
  ) {}
  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const student = await this.studentsRepository.findById(id);

      return res.status(201).json(mapper.map(student, Student, StudentDto));
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

export const getStudentById = container.resolve(GetStudentById);
