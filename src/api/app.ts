import "express-async-errors";

import "../shared/container";

import express from "express";

import { MappingProfiles } from "../app/helpers/mappings/mapper";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { router } from "./routes";

const app = express();
//DTO's
new MappingProfiles().MappingProfiles();

app.use(express.json());

app.use(router);
app.use(errorMiddleware)

export { app };
