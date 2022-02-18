import mongoose from "mongoose";
import IStream from "../types/Stream";

const StreamSchema = new mongoose.Schema<IStream>({
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
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
});

export default mongoose.models.Stream || mongoose.model("Stream", StreamSchema);
