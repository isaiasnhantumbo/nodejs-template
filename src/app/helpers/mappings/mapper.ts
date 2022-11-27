import { classes } from "@automapper/classes";
import { createMap, createMapper } from "@automapper/core";

import { Student } from "./../../../domain/Student";
import { StudentDto } from "./../../dtos/StudentDto";

export const mapper = createMapper({
  strategyInitializer: classes()
});
export class MappingProfiles {
  public MappingProfiles () {
    createMap(mapper, Student, StudentDto);
  }
}
