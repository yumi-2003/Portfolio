import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError.js";

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      status: err.status,
      message: err.message,
    });
  }

  const isMongooseValidationError = err.name === "ValidationError";
  if (isMongooseValidationError) {
    return res.status(400).json({
      success: false,
      status: "fail",
      message: err.message,
    });
  }

  const isMongooseCastError = err.name === "CastError";
  if (isMongooseCastError) {
    return res.status(400).json({
      success: false,
      status: "fail",
      message: "Invalid resource id",
    });
  }

  const message = err.message || "Something went wrong";
  const statusCode = 500;

  res.status(statusCode).json({
    success: false,
    status: "error",
    message,
  });
};
