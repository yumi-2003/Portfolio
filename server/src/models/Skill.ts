import mongoose, { Document, Schema } from "mongoose";

export interface ISkill extends Document {
  name: string;
  level: number; //0 - 100
  category: string; // frontend, backend, tools
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
  },
  { timestamps: true },
);

export default mongoose.model<ISkill>("Skill", skillSchema);
