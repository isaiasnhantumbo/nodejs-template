import { AutoMap } from "@automapper/classes";

export class StudentDto {
  @AutoMap()
    id: number;

  @AutoMap()
    name: string;
}
