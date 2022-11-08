import { AppError } from "./../errors/AppError";
import { StudentRepository } from "./../../infrastructure/repositories/StudentRepository";
import { IStudentRepository } from "./../interfaces/IStudentRepository";
import { Student } from "./../../domain/Student";
import { Request, Response } from "express";

export class CreateStudent {
  async handle(req: Request, res: Response) {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "O nome e obrigatório" });
    }
    try {
      const studentExist = await new StudentRepository().findByName(name);
      if (studentExist) {
        // throw new AppError("Student Exist", 409);

        return res.status(409).json({ message: "Student Exist" });
      }
      const student = new Student();
      student.name = name;
      await new StudentRepository().create(student);
      return res.status(201).json(student);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
