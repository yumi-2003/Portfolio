import { Router } from "express";
import {
  createSkill,
  getSkills,
  updateSkill,
  deleteSkill,
} from "../controllers/skillController.js";
import { protect } from "../middleware/authMiddleware.js";
import { createSkillValidator } from "../validators/skillValidator.js";
import { validate } from "../middleware/validate.js";

const router = Router();

router.post("/", protect, createSkillValidator, validate, createSkill);
router.get("/", protect, getSkills);
router.put("/:id", protect, updateSkill);
router.delete("/:id", protect, deleteSkill);

export default router;
