import mongoose, { Document, Schema } from "mongoose";

export interface ISkill extends Document {
  name: string;
  level: number; //0 - 100
  category: string; // frontend, backend, tools
  icon?: string;
}

const skillSchema = new Schema<ISkill>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    level: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    icon: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model<ISkill>("Skill", skillSchema);
