import mongoose from "mongoose";
import type IEvent from "../types/Event";

const EventSchema = new mongoose.Schema<IEvent>(
  {
    streamId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    icon: {
      type: String,
      required: false,
    },
  },
  { strict: false }
);

export default mongoose.models.Event || mongoose.model("Event", EventSchema);
