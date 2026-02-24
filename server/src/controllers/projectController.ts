import { Request, Response } from "express";
import Project from "../models/Project.js";

export const getProjects = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const projects = await Project.find();

    res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error: unknown) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

//createproject POST /api/projects
export const createProject = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const {
      title,
      description,
      techStack,
      githubLink,
      liveLink,
      image,
      featured,
    } = req.body;
    const projects = await Project.create({
      title,
      description,
      techStack,
      githubLink,
      liveLink,
      image,
      featured,
    });

    res.status(201).json({
      success: true,
      data: projects,
    });
  } catch (error: unknown) {
    res.status(500).json({
      success: true,
      message: "Failed to create project",
    });
  }
};
