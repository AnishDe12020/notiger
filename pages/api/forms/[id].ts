import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Form from "../../../models/Form";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    query: { id },
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const form = await Form.findById(id);
        if (!form) {
          return res.status(404).json({ error: "Form not found" });
        }
        res.status(200).json(form);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
      break;

    case "DELETE":
      try {
        const form = await Form.findByIdAndDelete(id);
        if (!form) {
          return res.status(404).json({ error: "Form not found" });
        }
        res.status(200).json(form);
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
