import mongoose from "mongoose";
import type IApiKey from "../types/ApiKey";

const ApiKeySchema = new mongoose.Schema<IApiKey>({
  key: {
    type: String,
    required: true,
    unique: true,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

export default mongoose.models.ApiKey || mongoose.model("ApiKey", ApiKeySchema);
