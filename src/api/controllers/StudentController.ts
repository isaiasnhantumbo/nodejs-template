import { Router } from "express";

import { GetAllStudentsController } from "./../../app/Students/GetAllStudents";
import { GetStudentByIdController } from "./../../app/Students/GetStudentById";
import { CreateStudentController } from "../../app/Students/CreateStudent";

const studentsRoutes = Router();

studentsRoutes.post("/student", new CreateStudentController().handle);
studentsRoutes.get("/student", new GetAllStudentsController().handle);
studentsRoutes.get("/student/:id", new GetStudentByIdController().handle);

export { studentsRoutes };
