import type { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import dbConnect from "../../../lib/dbConnect";
import Project from "../../../models/Project";
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
          const ownerId = req.query.ownerId as string;
          const projects = await Project.find({ ownerId: ownerId });
          res.status(200).json(projects);
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
            ownerId: ownerId,
          });

          project.save((err, project) => {
            if (err) {
              return res.status(400).json({ error: err.message });
            } else {
              return res.status(200).json(project);
            }
          });
        } catch (err) {
          return res.status(400).json({ error: err.message });
        }
        break;

      default:
        res.setHeader("Allow", ["GET", "POST"]);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

export default handler;
