import { NextFunction, Request, Response } from "express";

import { AppError } from "../../shared/errors/AppError";

export const errorMiddleware = (
  error: Error & Partial<AppError>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Error", error);

  const statusCode = error.statusCode ?? 500;
  const message = (error.statusCode != null) ? error.message : "Internal Server Error";
  return res.status(statusCode).json({ message });
};
