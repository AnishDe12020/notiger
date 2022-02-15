import type { Types } from "mongoose";
import Project from "./Project";

interface User {
  _id: Types.ObjectId;
  __v: string;
  clerk_id: string;
  updatedAt: Date;
  email: string;
  firstName?: string;
  lastName?: string;
  imageUrl: string;
  projects: Project[];
}

export default User;
