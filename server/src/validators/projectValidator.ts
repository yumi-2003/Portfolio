import { body } from "express-validator";

export const createProjectValidator = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("description").trim().notEmpty().withMessage("Description is required"),
  body("techStack")
    .custom((value) => {
      if (Array.isArray(value)) {
        return value.length > 0;
      }

      if (typeof value === "string") {
        return value
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean).length > 0;
      }

      return false;
    })
    .withMessage("Tech stack is required"),
];
