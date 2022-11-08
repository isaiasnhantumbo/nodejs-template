import { IStudentRepository } from "./../interfaces/IStudentRepository";
import { Student } from "./../../domain/Student";
import { Request, Response } from "express";
import { StudentRepository } from "../../infrastructure/repositories/StudentRepository";

export class GetAllStudents {
  async handle(req: Request, res: Response) {
    try {
      const students = await new StudentRepository().find();
      return res.status(201).json(students);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
