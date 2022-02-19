import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Event from "../../../models/Event";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    query: { id },
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const event = await Event.findById(id);
        if (!event) {
          return res.status(404).json({ error: "Event not found" });
        }
        res.status(200).json({ data: event });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
      break;

    case "DELETE":
      try {
        const event = await Event.findByIdAndDelete(id);
        if (!event) {
          return res.status(404).json({ error: "Event not found" });
        }
        res.status(200).json({ data: event });
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
