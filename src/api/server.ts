/* eslint-disable @typescript-eslint/no-floating-promises */
import { AppDataSource } from "../persistence/data-source";
import { app } from "./app";

AppDataSource.initialize().then(() => {
  return app.listen(process.env.PORT, () => {
    console.log("Server is running ", process.env.PORT);
  });
});
