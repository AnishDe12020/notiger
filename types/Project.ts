import type { Types } from "mongoose";

interface IProject {
  _id: Types.ObjectId;
  __v: number;
  name: string;
  description: string | null;
  updatedAt: Date;
  ownerId: Types.ObjectId;
}

export default IProject;
