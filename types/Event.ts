import type { Types } from "mongoose";

interface IEvent {
  _id: Types.ObjectId;
  __v: number;
  streamId: Types.ObjectId;
  name?: string;
  description?: string;
  icon?: string;
  [key: string]: any;
}

export default IEvent;
