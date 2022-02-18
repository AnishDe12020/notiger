import mongoose from "mongoose";
import type IProject from "../types/Project";

const ProjectSchema = new mongoose.Schema<IProject>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

export default mongoose.models.Project ||
  mongoose.model("Project", ProjectSchema);
