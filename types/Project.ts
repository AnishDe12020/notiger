import type { Types } from "mongoose";

interface Project {
  _id: Types.ObjectId;
  __v: string;
  name: string;
  description: string | null;
  createdAt: Date;
  ownerId: Types.ObjectId;
}

export default Project;
