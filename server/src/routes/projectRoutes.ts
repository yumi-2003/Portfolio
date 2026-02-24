import { Router } from "express";
import {
  createProject,
  getProjects,
} from "../controllers/projectController.js";

const router = Router();

//project routes
router.post("/", createProject);
router.get("/", getProjects);

export default router;
