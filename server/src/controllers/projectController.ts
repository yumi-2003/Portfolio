import { Request, Response } from "express";
import Project from "../models/Project.js";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
  CloudinaryUploadResult,
} from "../utils/cloudinaryHelper.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";

export const getProjects = catchAsync(async (req: Request, res: Response) => {
  const projects = await Project.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    data: projects,
  });
});

// createProject POST /api/projects
export const createProject = catchAsync(async (req: Request, res: Response) => {
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
});

// getProjectById GET /api/project/:id
export const getProjectById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const project = await Project.findById(id);

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  res.status(200).json({
    success: true,
    data: project,
  });
});

// updateProject PUT /api/projects/:id
export const updateProject = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, techStack, githubLink, liveLink, featured } =
    req.body;

  const project = await Project.findById(id);

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  let techArray = project.techStack;
  if (techStack) {
    techArray =
      typeof techStack === "string"
        ? techStack.split(",").map((s) => s.trim())
        : techStack;
  }

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
    featured:
      featured !== undefined
        ? featured === "true" || featured === true
        : project.featured,
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
});

// deleteProject DELETE /api/projects/:id
export const deleteProject = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const project = await Project.findById(id);

  if (!project) {
    throw new AppError("Project not found", 404);
  }

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
});

// deleteProjectImage DELETE /api/projects/:id/image
export const deleteProjectImage = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { public_id } = req.body;

    const project = await Project.findById(id);

    if (!project) {
      throw new AppError("Project not found", 404);
    }

    const currentImages = project.images || [];
    const imageExists = currentImages.some((img) => img.public_id === public_id);
    if (!imageExists) {
      throw new AppError("Image not found in project", 400);
    }

    await deleteFromCloudinary(public_id);

    project.images = currentImages.filter((img) => img.public_id !== public_id);
    await project.save();

    res.status(200).json({
      success: true,
      data: project,
    });
  },
);
