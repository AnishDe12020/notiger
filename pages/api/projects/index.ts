import type { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import dbConnect from "../../../lib/dbConnect";
import Project from "../../../models/Project";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  console.log("req came ");

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const projects = await Project.find({});
        res.status(200).json({ data: projects });
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
      break;
    case "POST":
      try {
        const ownerId = new ObjectId(req.body.ownerId);
        const project = new Project({
          name: req.body.name,
          description: req.body?.description,
          owner: ownerId,
        });

        project.save((err, project) => {
          if (err) {
            res.status(400).json({ error: err.message });
          } else {
            res.status(200).json({ data: project });
          }
        });
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
