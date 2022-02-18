import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Stream from "../../../models/Stream";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const stream = await Stream.findById(id);
        if (!stream) {
          return res.status(404).json({
            error: "Stream not found",
          });
        }
        res.status(200).json({ data: stream });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
      break;

    case "PUT":
      try {
        const stream = await Stream.findByIdAndUpdate(id, {
          name: req.body.name,
          description: req.body.description,
        });
        if (!stream) {
          return res.status(404).json({
            error: "Stream not found",
          });
        }
        res.status(200).json({ data: stream });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
      break;

    case "DELETE":
      try {
        const stream = await Stream.deleteOne({ _id: id });
        if (!stream) {
          return res.status(404).json({
            error: "Stream not found",
          });
        }
        res.status(200).json({ data: stream });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} not allowed`);
  }
};

export default handler;
