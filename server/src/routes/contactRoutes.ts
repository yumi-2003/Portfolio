import { Router } from "express";
import {
  createContact,
  getContacts,
  markAsRead,
  deleteContact,
} from "../controllers/contactController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/", protect, createContact); //public
router.get("/", getContacts); // protect later
router.patch("/:id/read", protect, markAsRead);
router.delete("/:id", protect, deleteContact);

export default router;
