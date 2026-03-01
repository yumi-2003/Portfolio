import { Router } from "express";
import { loginAdmin } from "../controllers/authController.js";
import { loginLimiter } from "../middleware/rateLimit.js";

const router = Router();
router.post("/login", loginLimiter, loginAdmin);

export default router;
