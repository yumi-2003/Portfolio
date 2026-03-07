import { body } from "express-validator";

export const createSkillValidator = [
  body("name").notEmpty().withMessage("Skill name is required"),
  body("level")
    .isInt({ min: 0, max: 100 })
    .withMessage("Level must be between 0 and 100"),
  body("category").notEmpty().withMessage("Category is required"),
  body("icon").optional().isString().withMessage("Icon must be a string"),
];
