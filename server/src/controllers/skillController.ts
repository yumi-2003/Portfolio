import { Request, Response } from "express";
import Skill from "../models/Skill.js";

export const createSkill = async (req: Request, res: Response) => {
  try {
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

//get all skills
export const getSkills = async (req: Request, res: Response) => {
  try {
    const skills = await Skill.find().sort({ level: -1 });

    res.status(200).json({
      success: true,
      data: skills,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

//update skill
export const updateSkill = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const updateSkill = await Skill.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updateSkill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }
    res.status(200).json({
      success: true,
      data: updateSkill,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

//delete skill
export const deleteSkill = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const skill = await Skill.findByIdAndDelete(id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Skill deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
