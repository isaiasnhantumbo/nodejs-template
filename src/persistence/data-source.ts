/* eslint-disable n/no-path-concat */
import "dotenv/config";
import "reflect-metadata";

import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as number | undefined,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [
    process.env.NODE_ENV === "production"
      ? "dist/domain/*.{ts,js}"
      : "src/**/domain/*.{ts,js}"
  ],
  migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
  logging: true
});
