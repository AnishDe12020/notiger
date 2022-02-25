import type { Types } from "mongoose";

interface IApiKey {
  _id: Types.ObjectId;
  __v: number;
  key: string;
  ownerId: Types.ObjectId;
}

export default IApiKey;
