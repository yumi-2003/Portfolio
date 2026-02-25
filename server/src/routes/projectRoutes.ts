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

const router = Router();

// project routes
router.get("/", getProjects);
router.get("/:id", getProjectById);
router.post("/", upload.array("images", 5), createProject);
router.put("/:id", upload.array("images", 5), updateProject);
router.delete("/:id", deleteProject);
router.delete("/:id/image", deleteProjectImage);

export default router;
