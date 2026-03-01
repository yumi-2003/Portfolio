import { Router } from "express";
import {
  createContact,
  getContacts,
  markAsRead,
  deleteContact,
} from "../controllers/contactController.js";
import { protect } from "../middleware/authMiddleware.js";
import { contactLimiter } from "../middleware/rateLimit.js";
import { createContactValidator } from "../validators/contactValidator.js";
import { validate } from "../middleware/validate.js";

const router = Router();

router.post("/", contactLimiter, createContactValidator, validate, createContact); //public
router.get("/", protect, getContacts); // protect later
router.patch("/:id/read", protect, markAsRead);
router.delete("/:id", protect, deleteContact);

export default router;
