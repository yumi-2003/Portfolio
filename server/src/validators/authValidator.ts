import { body } from "express-validator";

export const loginValidator = [
  body("email").trim().notEmpty().withMessage("Email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];
