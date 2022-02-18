import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Stream from "../../../models/Stream";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const streams = await Stream.find({});
        res.status(200).json({ data: streams });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
      break;

    case "POST":
      try {
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
            res.status(200).json({ data: stream });
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
};

export default handler;
