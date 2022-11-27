import "express-async-errors";

import "../shared/container";

import cors from "cors";
import express, { Application } from "express";
import swaggerUi from "swagger-ui-express";

import { MappingProfiles } from "../app/helpers/mappings/mapper";
import swaggerDocs from "./docs/swagger.json";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { RegisterRoutes } from "./routes";

const app: Application = express();
// DTO's
new MappingProfiles().MappingProfiles();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
RegisterRoutes(app);
app.use(errorMiddleware);

export { app };
