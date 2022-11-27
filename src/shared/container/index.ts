import { container } from "tsyringe";

import { IStudentRepository } from "../../app/interfaces/IStudentRepository";
import { StudentRepository } from "../../infrastructure/repositories/StudentRepository";

container.register<IStudentRepository>("StudentRepository", StudentRepository);
