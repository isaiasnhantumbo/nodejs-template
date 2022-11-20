import { Router } from "express";
import { container } from "tsyringe";

import { createStudent } from "./../../app/Students/CreateStudent";
import { getAllStudent } from "../../app/Students/GetAllStudents";
import { getStudentById } from "../../app/Students/GetStudentById";
const studentsRoutes = Router();

studentsRoutes.post("/student", (req, res) => {
  createStudent.handle(req, res);
});
studentsRoutes.get("/student", (req, res) => {
  getAllStudent.handle(req, res);
});
studentsRoutes.get("/student/:id", (req, res) => {
  getStudentById.handle(req, res);
});

export { studentsRoutes };
