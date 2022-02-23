import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Form from "../../../models/Form";
import Stream from "../../../models/Stream";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    query: { streamId },
  } = req;

  if (!streamId) {
    return res.status(400).json({
      error: "Missing streamId",
    });
  } else if (!ObjectId.isValid(streamId as string)) {
    return res.status(400).json({
      error: "Invalid streamId",
    });
  } else if (Stream.exists({ _id: streamId })) {
    return res.status(400).json({
      error: "Stream does not exist",
    });
  } else {
    await dbConnect();

    switch (method) {
      case "GET":
        try {
          const forms = await Form.find({});
          res.status(200).json(forms);
        } catch (error) {
          res.status(400).json({ error: error.message });
        }
        break;

      case "POST":
        try {
          const streamIdFormatted = new ObjectId(streamId as string);
          const form = new Form({
            streamId: streamIdFormatted,
            ...req.body,
          });

          form.save((err, form) => {
            if (err) {
              res.status(500).json({ error: err.message });
            } else {
              res.status(200).json(form);
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
  }
};

export default handler;
