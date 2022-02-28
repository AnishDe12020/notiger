import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Event from "../../../models/Event";
import Stream from "../../../models/Stream";
import sizeof from "object-sizeof";
import ApiKey from "../../../models/ApiKey";
import { getToken } from "next-auth/jwt";
import FCMToken from "../../../models/FCMToken";
import { messaging } from "../../../lib/firebase-admin";

const secret = process.env.SECRET;

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
  } else if (!Stream.exists({ _id: new ObjectId(streamId as string) })) {
    return res.status(404).json({
      error: "Stream does not exist",
    });
  } else {
    await dbConnect();

    switch (method) {
      case "GET":
        {
          const token = getToken({ req, secret });
          if (token) {
            try {
              const events = await Event.find({ streamId: streamId }).sort({
                _id: -1,
              });
              res.status(200).json(events);
            } catch (error) {
              res.status(400).json({ error: error.message });
            }
          } else {
            res.status(401).json({ error: "Unauthorized" });
          }
        }
        break;

      case "POST":
        try {
          const apiKey = req.headers["x-api-key"] || req.query.apiKey;
          if (!apiKey) {
            return res.status(400).json({
              error: "Missing API key",
            });
          } else if (!(await ApiKey.exists({ key: apiKey }))) {
            return res.status(400).json({
              error: "Invalid API key",
            });
          } else {
            const streamIdFormatted = new ObjectId(streamId as string);
            const body = req.body;
            if (typeof body === "object") {
              if (sizeof(body) <= 16384) {
                const event = new Event({
                  streamId: streamIdFormatted,
                  ...body,
                });

                event.save((err, event) => {
                  if (err) {
                    res.status(500).json({ error: err.message });
                  } else {
                    res.status(200).json(event);
                  }
                });

                const stream = await Stream.findOne({
                  _id: streamIdFormatted,
                });

                const registrationTokens = await FCMToken.find({
                  ownerId: stream.ownerId,
                });

                messaging
                  .sendMulticast({
                    data: body,
                    tokens: registrationTokens.map(token => token.token),
                  })
                  .then(res => console.log(res));
              } else {
                throw new Error("Body too large. Keep it under 16384 bytes");
              }
            } else {
              throw Error("Body must be an object (json)");
            }
          }
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
