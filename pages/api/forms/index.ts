import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Form from "../../../models/Form";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    query: { streamId },
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const forms = await Form.find({});
        res.status(200).json({ data: forms });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
      break;

    case "POST":
      try {
        console.log(streamId);
        const streamIdFormatted = new ObjectId(streamId as string);
        const form = new Form({
          streamId: streamIdFormatted,
          ...req.body,
        });

        form.save((err, form) => {
          if (err) {
            res.status(500).json({ error: err.message });
          } else {
            res.status(200).json({ data: form });
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
