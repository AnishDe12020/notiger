import { Schema } from "mongoose";
import { User, Account, Session, VerificationToken } from "../types/NextAuth";

export const userSchema = new Schema<User>({
  name: { type: String },
  email: { type: String, unique: true },
  emailVerified: { type: Date },
  image: { type: String },
});

export const accountSchema = new Schema<Account>({
  type: { type: String },
  provider: { type: String },
  providerAccountId: { type: String },
  refresh_token: { type: String },
  access_token: { type: String },
  expires_at: { type: Number },
  token_type: { type: String },
  scope: { type: String },
  id_token: { type: String },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  oauth_token_secret: { type: String },
  oauth_token: { type: String },
  session_state: { type: String },
});

export const sessionSchema = new Schema<Session>({
  expires: { type: Date },
  sessionToken: { type: String, unique: true },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

export const verificationTokenSchema = new Schema<VerificationToken>({
  token: { type: String },
  expires: { type: Date },
  identifier: { type: String },
});
