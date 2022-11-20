import { createStudent } from "./../../app/Students/CreateStudent";
import { container } from "tsyringe";
import { Router } from "express";
import { getAllStudent } from "../../app/Students/GetAllStudents";
const studentsRoutes = Router();

studentsRoutes.post("/student", (req, res) => {
  createStudent.handle(req, res);
});
studentsRoutes.get("/student", (req, res) => {
  getAllStudent.handle(req, res);
});

export { studentsRoutes };
