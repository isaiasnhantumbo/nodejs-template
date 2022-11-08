import { Router } from "express";
import { CreateStudent } from "./../../app/Students/CreateStudent";
import { GetAllStudents } from "../../app/Students/GetAllStudents";
const studentsRoutes = Router();

studentsRoutes.post("/student", new CreateStudent().handle);
studentsRoutes.get("/student", new GetAllStudents().handle);

export { studentsRoutes };
