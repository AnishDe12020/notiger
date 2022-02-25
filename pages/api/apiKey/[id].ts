import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import ApiKey from "../../../models/ApiKey";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    query: { id },
  } = req;

  await dbConnect();

  switch (method) {
    case "DELETE":
      try {
        const apiKey = await ApiKey.findByIdAndDelete(id);
        if (!apiKey) {
          return res.status(404).json({
            error: "API key not found",
          });
        }

        res.status(200).json(apiKey);
      } catch (err) {
        return res.status(500).json({
          error: err.message,
        });
      }
      break;

    default:
      res.setHeader("Allow", ["DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
