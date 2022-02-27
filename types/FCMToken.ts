import type { Types } from "mongoose";

interface IFCMToken {
  _id: Types.ObjectId;
  __v: number;
  token: string;
  ownerId: Types.ObjectId;
}

export default IFCMToken;
