import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateStudent } from "./CreateStudent";

export class CreateStudentController {
  async handle(request: Request, response: Response) : Promise<Response> {
    const { name } = request.body;
    const createStudent = container.resolve(CreateStudent);
    const student = await createStudent.handle({ name });
    return response.status(201).json(student);
  }
}
