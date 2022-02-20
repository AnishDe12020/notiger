import type { Types } from "mongoose";

interface IForm {
  _id: Types.ObjectId;
  __V: number;
  streamId: Types.ObjectId;
  name?: string;
  description?: string;
  icon?: string;
  [key: string]: any;
}

export default IForm;
