import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteStudent } from "./DeleteStudent";

export class DeleteStudentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteStudent = container.resolve(DeleteStudent);
    const student = await deleteStudent.handle(id);
    return response.status(200).json(student);
  }
}
