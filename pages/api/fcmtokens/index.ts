import type { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import dbConnect from "../../../lib/dbConnect";
import { getToken } from "next-auth/jwt";
import FCMToken from "../../../models/FCMToken";

const secret = process.env.SECRET;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req, secret });

  if (token) {
    const { method } = req;

    await dbConnect();

    switch (method) {
      case "GET":
        try {
          // @ts-ignore
          const ownerId = (req.query.ownerId as string) || token.user.id;

          const fcmTokens = await FCMToken.find({
            ownerId: new ObjectId(ownerId),
          });

          res.status(200).json(fcmTokens);
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
        break;

      case "POST":
        try {
          // @ts-ignore
          const ownerId = new ObjectId(token.user.id);
          const { fcmToken } = req.body;

          const fcmTokenDoc = new FCMToken({
            ownerId,
            token: fcmToken,
          });

          fcmTokenDoc.save((err, fcmToken) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ error: err.message });
            } else {
              return res.status(200).json(fcmToken);
            }
          });
        } catch (err) {
          return res.status(500).json({ error: err.message });
        }
        break;

      default:
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).send(`Method ${method} Not Allowed`);
    }
  } else {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }
};

export default handler;
