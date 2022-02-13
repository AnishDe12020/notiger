import { ObjectId } from "mongodb";
import {
  userSchema,
  accountSchema,
  sessionSchema,
  verificationTokenSchema,
} from "../models/NextAuth";
import type {
  Adapter,
  AdapterSession,
  AdapterUser,
  VerificationToken,
} from "next-auth/adapters";
import type { Account, Session } from "next-auth";
import type { VerificationToken as IVerificationToken } from "../types/NextAuth";
import dbConnect from "./dbConnect";

export const format = {
  from<T = Record<string, unknown>>(object: Record<string, any>): T {
    const newObject: Record<string, unknown> = {};
    Object.keys(object).forEach(key => {
      const value = object[key];
      if (key === "_id") {
        newObject.id = value.toHexString();
      } else if (key === "userId") {
        newObject[key] = value.toHexString();
      } else if (key !== "__v") {
        newObject[key] = value;
      }
    });

    return newObject as T;
  },
};

export const _id = (hex?: string) => {
  if (hex?.length !== 24) return new ObjectId();
  return new ObjectId(hex);
};

export const CustomMongooseAdapter = (): Adapter => {
  const { from } = format;

  // const conn = (async () => {
  //   const conn = await dbConnect();
  //   return conn;
  // })();
  //
  const conn = dbConnect();

  const UserModel = conn.model("User", userSchema);
  const AccountModel = conn.model("Account", accountSchema);
  const SessionModel = conn.model("Session", sessionSchema);
  const VerificationTokenModel = conn.model(
    "VerificationToken",
    verificationTokenSchema
  );

  return {
    async createUser(data) {
      const user = await UserModel.create(data);
      return from<AdapterUser>(user);
    },
    async getUser(id) {
      try {
        const user = await UserModel.findById(id).lean();
        if (!user) return null;
        return from<AdapterUser>(user);
      } catch (err) {
        return null;
      }
    },
    async getUserByEmail(email) {
      const user = await UserModel.findOne({ email: email }).lean();
      if (!user) return null;
      return from<AdapterUser>(user);
    },
    async getUserByAccount(data) {
      const account: Account = await AccountModel.findOne(data);
      if (!account) return null;
      const user = await UserModel.findById(account.userId).lean();
      if (!user) return null;
      return from<AdapterUser>(user);
    },
    async updateUser(data) {
      const user = await UserModel.findByIdAndUpdate(
        data.id,
        { name: data.name },
        { new: true }
      ).exec();
      return from<AdapterUser>(user);
    },
    async deleteUser(id) {
      await Promise.all([
        AccountModel.deleteMany({ userId: id }),
        SessionModel.deleteMany({ userId: id }),
        UserModel.findByIdAndDelete(id),
      ]);
    },
    async linkAccount(data) {
      const account = await AccountModel.create(data);
      return from<Account>(account);
    },
    async unlinkAccount(data) {
      const account = await AccountModel.findOneAndDelete(data);
      return from<Account>(account);
    },
    async getSessionAndUser(sessionToken) {
      const session: Session = await SessionModel.findOne({
        sessionToken: sessionToken,
      }).lean();
      if (!session) return null;
      const user = await UserModel.findById(session.userId).lean();
      if (!user) return null;
      return {
        user: from<AdapterUser>(user),
        session: from<AdapterSession>(session),
      };
    },
    async createSession(data) {
      const session = await SessionModel.create(data);
      return from<AdapterSession>(session);
    },
    async updateSession(data) {
      const session = await SessionModel.findOneAndUpdate({
        sessionToken: data.sessionToken,
        expires: data.expires,
      });
      return from<AdapterSession>(session);
    },
    async deleteSession(sessionToken) {
      const session = await SessionModel.findOneAndDelete({
        sessionToken: sessionToken,
      });
      return from<AdapterSession>(session);
    },
    async createVerificationToken(data) {
      const verificationToken = await VerificationTokenModel.create(data);
      return from<VerificationToken>(verificationToken);
    },
    async useVerificationToken(data) {
      const verificationToken: IVerificationToken =
        await VerificationTokenModel.findOneAndDelete(data).lean();
      if (!verificationToken) return null;
      // eslint-disable-next-line no-unused-vars
      const { _id, __v, ...rest } = verificationToken;
      return rest;
    },
  };
};
