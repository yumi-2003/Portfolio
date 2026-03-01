import { Router } from "express";
import { loginAdmin } from "../controllers/authController.js";
import { loginLimiter } from "../middleware/rateLimit.js";
import { loginValidator } from "../validators/authValidator.js";
import { validate } from "../middleware/validate.js";

const router = Router();
router.post("/login", loginLimiter, loginValidator, validate, loginAdmin);

export default router;
