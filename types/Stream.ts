import type { Types } from "mongoose";

interface IStream {
  _id: string;
  __v: number;
  name: string;
  description: string;
  updatedAt: Date;
  projectId: Types.ObjectId;
}

export default IStream;
