import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Stream from "../../../models/Stream";
import { getToken } from "next-auth/jwt";

const secret = process.env.SECRET;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req, secret });

  if (token) {
    const { method } = req;

    await dbConnect();

    switch (method) {
      case "GET":
        try {
          const projectId = req.query.projectId as string;
          const streams = await Stream.find({ projectId: projectId });
          res.status(200).json(streams);
        } catch (error) {
          res.status(400).json({ error: error.message });
        }
        break;

      case "POST":
        try {
          console.log(req.body);
          const projectId = new ObjectId(req.body.projectId);
          const stream = new Stream({
            name: req.body.name,
            description: req.body?.description,
            projectId: projectId,
          });

          stream.save((err, stream) => {
            if (err) {
              res.status(500).json({ error: err.message });
            } else {
              res.status(200).json(stream);
            }
          });
        } catch (error) {
          res.status(400).json({ error: error.message });
        }
        break;

      default:
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

export default handler;
