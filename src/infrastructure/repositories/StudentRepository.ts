import { Student } from "../../domain/Student";
import { AppDataSource } from "../../persistence/data-source";
import { IStudentRepository } from "./../../app/interfaces/IStudentRepository";

export class StudentRepository implements IStudentRepository {
  public studentRepository = AppDataSource.getRepository(Student);

  async create(entity: Student): Promise<Student> {
    this.studentRepository.create(entity);
    return await this.studentRepository.save(entity);
  }
  async findById(id: string): Promise<Student> {
    return (await this.studentRepository.findOneBy({
      id: Number(id),
    })) as Student;
  }
  async findByName(name: string): Promise<Student> {
    return (await this.studentRepository.findOneBy({
      name,
    })) as Student;
  }
  async find(): Promise<Student[]> {
    return await this.studentRepository.find();
  }
  async update(entity: Student): Promise<Student> {
    return await this.studentRepository.save(entity);
  }
  async delete(id: string): Promise<boolean> {
    return (await this.studentRepository.delete(id)) as any;
  }
}
