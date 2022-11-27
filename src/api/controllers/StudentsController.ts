import {
  Body,
  Controller,
  Delete,
  Example,
  Get,
  Patch,
  Path,
  Post,
  Route,
  SuccessResponse,
  Tags
} from "tsoa";
import { container } from "tsyringe";

import { ICreateStudent } from "../../app/@types/ICreateStudent";
import { CreateStudent } from "../../app/Students/CreateStudent";
import { DeleteStudent } from "../../app/Students/DeleteStudent";
import { GetAllStudents } from "../../app/Students/GetAllStudents";
import { GetStudentById } from "../../app/Students/GetStudentById";
import { StudentDto } from "./../../app/dtos/StudentDto";
import { UpdateStudent } from "./../../app/Students/UpdateStudent/index";

@Route("students")
@Tags("Students Routes")
export class StudentsController extends Controller {
  /**
   * Create Student Route
   */
  @Example<ICreateStudent>({
    name: "John Doe"
  })
  @SuccessResponse("201", "Created")
  @Post()
  public async createStudent (
    @Body() requestBody: ICreateStudent
  ): Promise<StudentDto> {
    const createStudent = container.resolve(CreateStudent);
    const student = await createStudent.handle(requestBody);
    this.setStatus(201);
    return student;
  }

  @Get()
  public async getStudents (): Promise<StudentDto[]> {
    const getAllStudents = container.resolve(GetAllStudents);
    const students = await getAllStudents.handle();
    return students;
  }

  @Get("{studentId}")
  public async getStudentById (@Path() studentId: number): Promise<StudentDto> {
    const getStudentById = container.resolve(GetStudentById);
    const student = await getStudentById.handle(studentId);
    return student;
  }

  @Patch("{studentId}")
  public async updateStudent (
    @Path() studentId: number,
      @Body() requestBody: ICreateStudent
  ): Promise<StudentDto> {
    const updateStudent = container.resolve(UpdateStudent);
    const student = await updateStudent.handle(studentId, requestBody);
    return student;
  }

  @Delete("{studentId}")
  public async deleteStudent (@Path() studentId: number): Promise<StudentDto> {
    const deleteStudent = container.resolve(DeleteStudent);
    const student = await deleteStudent.handle(studentId);
    return student;
  }
}
