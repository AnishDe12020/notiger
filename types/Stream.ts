import type { Types } from "mongoose";

interface IStream {
  _id: Types.ObjectId;
  __v: number;
  name: string;
  description: string;
  updatedAt: Date;
  projectId: Types.ObjectId;
  ownerId: Types.ObjectId;
}

export default IStream;
