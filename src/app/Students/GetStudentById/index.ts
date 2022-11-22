import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetStudentById } from "./GetStudentById";

export class GetStudentByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const getStudentById = container.resolve(GetStudentById);
    const student = await getStudentById.handle(id);
    return response.status(200).json(student);
  }
}
