import { Router } from "express";
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  deleteProjectImage,
} from "../controllers/projectController.js";
import upload from "../middleware/upload.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

// project routes
router.get("/", getProjects);
router.get("/:id", getProjectById);
router.post("/", protect, upload.array("images", 5), createProject);
router.put("/:id", protect, upload.array("images", 5), updateProject);
router.delete("/:id", protect, deleteProject);
router.delete("/:id/image", protect, deleteProjectImage);

export default router;
