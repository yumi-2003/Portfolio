import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError.js";

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const isOperational = err instanceof AppError;
  const statusCode = isOperational ? err.statusCode : 500;
  const status = isOperational ? err.status : "error";
  const message = isOperational ? err.message : "Something went wrong";

  res.status(statusCode).json({
    success: false,
    status,
    message,
  });
};
