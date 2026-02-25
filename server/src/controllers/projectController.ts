import { Request, Response } from "express";
import Project from "../models/Project.js";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
  CloudinaryUploadResult,
} from "../utils/cloudinaryHelper.js";

export const getProjects = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });

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

// createProject POST /api/projects
export const createProject = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { title, description, techStack, githubLink, liveLink, featured } =
      req.body;

    const techArray =
      typeof techStack === "string"
        ? techStack.split(",").map((s) => s.trim())
        : techStack;

    let imageUrls: CloudinaryUploadResult[] = [];

    if (req.files && Array.isArray(req.files)) {
      const files = req.files as Express.Multer.File[];
      const uploadPromises = files.map((file) => uploadToCloudinary(file.buffer));
      imageUrls = await Promise.all(uploadPromises);
    }

    const project = await Project.create({
      title,
      description,
      techStack: techArray,
      githubLink,
      liveLink,
      featured: featured === "true" || featured === true,
      images: imageUrls,
    });

    res.status(201).json({
      success: true,
      data: project,
    });
  } catch (error: unknown) {
    console.error("Create Project Error:", error);
    res.status(500).json({
      success: false, 
      message: "Failed to create project",
    });
  }
};

// getProjectById GET /api/project/:id
export const getProjectById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Invalid Id or Server error",
    });
  }
};

// updateProject PUT /api/projects/:id
export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, techStack, githubLink, liveLink, featured } =
      req.body;

    let project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Handle techStack
    let techArray = project.techStack;
    if (techStack) {
      techArray =
        typeof techStack === "string"
          ? techStack.split(",").map((s) => s.trim())
          : techStack;
    }

    // Handle new images
    let newImages: CloudinaryUploadResult[] = [];
    if (req.files && Array.isArray(req.files)) {
      const files = req.files as Express.Multer.File[];
      const uploadPromises = files.map((file) => uploadToCloudinary(file.buffer));
      newImages = await Promise.all(uploadPromises);
    }

    const updatedData = {
      title: title || project.title,
      description: description || project.description,
      techStack: techArray,
      githubLink: githubLink !== undefined ? githubLink : project.githubLink,
      liveLink: liveLink !== undefined ? liveLink : project.liveLink,
      featured: featured !== undefined ? (featured === "true" || featured === true) : project.featured,
      images: [...(project.images || []), ...newImages],
    };

    const updatedProject = await Project.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: updatedProject,
    });
  } catch (error) {
    console.error("Update Project Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update project",
    });
  }
};

// deleteProject DELETE /api/projects/:id
export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Delete all images from Cloudinary
    const imagesToDelete = project.images || [];
    if (imagesToDelete.length > 0) {
      const deletePromises = imagesToDelete.map((img) =>
        deleteFromCloudinary(img.public_id),
      );
      await Promise.all(deletePromises);
    }

    await Project.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Project and associated images deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// deleteProjectImage DELETE /api/projects/:id/image
export const deleteProjectImage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { public_id } = req.body;

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Check if image exists in project
    const currentImages = project.images || [];
    const imageExists = currentImages.some((img) => img.public_id === public_id);
    if (!imageExists) {
      return res.status(400).json({
        success: false,
        message: "Image not found in project",
      });
    }

    // Delete from Cloudinary
    await deleteFromCloudinary(public_id);

    // Remove from DB
    project.images = currentImages.filter((img) => img.public_id !== public_id);
    await project.save();

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

