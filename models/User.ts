import mongoose, { Schema } from "mongoose";
import User from "../types/User";

const userSchema = new Schema<User>({
  clerk_id: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  email: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  imageUrl: {
    type: String,
    required: false,
  },
  projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
});

export default mongoose.models.User || mongoose.model("User", userSchema);
