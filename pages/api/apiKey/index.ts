import type { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import dbConnect from "../../../lib/dbConnect";
import { getToken } from "next-auth/jwt";
import ApiKey from "../../../models/ApiKey";

const secret = process.env.SECRET;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req, secret });

  if (token) {
    const { method } = req;

    await dbConnect();

    switch (method) {
      case "GET":
        try {
          const ownerId = req.query.ownerId as string;
          const apiKeys = await ApiKey.find({ ownerId: ownerId });
          res.status(200).json(apiKeys);
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
        break;
      case "POST":
        try {
          // @ts-ignore
          const ownerId = new ObjectId(token.user.id);

          const generateApiKey = async () => {
            const randomUUID = crypto.randomUUID();
            const apiKeyExists = await ApiKey.exists({ key: randomUUID });
            if (apiKeyExists) {
              generateApiKey();
            } else {
              return randomUUID;
            }
          };

          const apiKeyObject = new ApiKey({
            ownerId,
            key: generateApiKey(),
          });

          apiKeyObject.save((err, apiKeyObject) => {
            if (err) {
              console.log(err);
              return res.status(500).json({ error: err.message });
            } else {
              return res.status(200).json(apiKeyObject);
            }
          });
        } catch (err) {
          return res.status(500).json({ error: err.message });
        }
        break;

      default:
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } else {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }
};

export default handler;
