import type { Types } from "mongoose";

export interface User {
  _id: Types.ObjectId;
  __v: string;
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
}

export interface Account {
  _id: Types.ObjectId;
  __v: string;
  id: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token: string;
  access_token: string | null;
  expires_at: number | null;
  token_type: string | null;
  scope: string;
  id_token: string;
  userId: Types.ObjectId;
  oauth_token_secret: string;
  oauth_token: string;
  session_state: string;
}

export interface Session {
  _id: Types.ObjectId;
  __v: string;
  id: string;
  expires: Date;
  sessionToken: string;
  userId: Types.ObjectId;
}

export interface VerificationToken {
  _id: Types.ObjectId;
  __v: string;
  token: string;
  expires: Date;
  identifier: string;
}
