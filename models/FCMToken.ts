import mongoose from "mongoose";
import type IFCMToken from "../types/FCMToken";

const FCMTokenSchema = new mongoose.Schema<IFCMToken>({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

export default mongoose.models.FCMToken ||
  mongoose.model("FCMToken", FCMTokenSchema);
