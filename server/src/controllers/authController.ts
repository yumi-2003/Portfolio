import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";

export const loginAdmin = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  if (!admin) {
    throw new AppError("Invalid credentials", 401);
  }

  const isMatch = await bcrypt.compare(password, admin.password);

  if (!isMatch) {
    throw new AppError("Invalid credentials", 401);
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new AppError("JWT_SECRET is not configured", 500);
  }

  const jwtExpires = process.env.JWT_EXPIRES;
  const signOptions: jwt.SignOptions = {};

  if (jwtExpires) {
    signOptions.expiresIn = jwtExpires as NonNullable<
      jwt.SignOptions["expiresIn"]
    >;
  }

  const token = jwt.sign({ id: admin._id.toString() }, jwtSecret, signOptions);

  return res.status(200).json({
    success: true,
    token,
  });
});
