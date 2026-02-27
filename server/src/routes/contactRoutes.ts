import { Router } from "express";
import {
  createContact,
  getContacts,
  markAsRead,
  deleteContact,
} from "../controllers/contactController.js";

const router = Router();

router.post("/", createContact); //public
router.get("/", getContacts); // protect later
router.patch("/:id/read", markAsRead);
router.delete("/:id", deleteContact);

export default router;
