import { StudentRepository } from "../../infrastructure/repositories/StudentRepository";
import { IStudentRepository } from "../../app/interfaces/IStudentRepository";
import { container } from "tsyringe";

container.register<IStudentRepository>("StudentRepository", StudentRepository);
