import { Request, Response } from "express";
import { Post, Route, SuccessResponse } from "tsoa";
import { container } from "tsyringe";

import { NotFoundError } from './../../../shared/errors/AppError';
import { CreateStudent } from "./CreateStudent";

@Route("student")
export class CreateStudentController {
  @SuccessResponse("201", "Created") // Custom success response
  @Post()
  async handle(request: Request, response: Response) : Promise<Response> {
    const { name } = request.body;
    const createStudent = container.resolve(CreateStudent);
    const student = await createStudent.handle({ name });
    return response.status(201).json(student);
  }
}
