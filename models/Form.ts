import mongoose from "mongoose";
import type IForm from "../types/Form";

const FormSchema = new mongoose.Schema<IForm>(
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

export default mongoose.models.Form || mongoose.model("Form", FormSchema);
