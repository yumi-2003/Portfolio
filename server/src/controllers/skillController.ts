import { Request, Response } from "express";
import Skill from "../models/Skill.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";

export const createSkill = catchAsync(async (req: Request, res: Response) => {
  const { name, level, category } = req.body;

  const skill = await Skill.create({
    name,
    level,
    category,
  });

  res.status(201).json({
    success: true,
    data: skill,
  });
});

//get all skills
export const getSkills = catchAsync(async (req: Request, res: Response) => {
  const skills = await Skill.find().sort({ level: -1 });

  res.status(200).json({
    success: true,
    data: skills,
  });
});

//update skill
export const updateSkill = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const updatedSkill = await Skill.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedSkill) {
    throw new AppError("Skill not found", 404);
  }

  res.status(200).json({
    success: true,
    data: updatedSkill,
  });
});

//delete skill
export const deleteSkill = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const skill = await Skill.findByIdAndDelete(id);

  if (!skill) {
    throw new AppError("Skill not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Skill deleted successfully",
  });
});
