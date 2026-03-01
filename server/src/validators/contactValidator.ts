import { body } from "express-validator";

export const createContactValidator = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Please provide a valid email"),
  body("message").trim().notEmpty().withMessage("Message is required"),
];
