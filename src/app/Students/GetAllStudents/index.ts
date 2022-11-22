import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetAllStudents } from "./GetAllStudents";

export class GetAllStudentsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const getAllStudents = container.resolve(GetAllStudents);
    const students = await getAllStudents.handle();
    return response.status(200).json(students);
  }
}
