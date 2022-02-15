import type { NextApiResponse, NextApiRequest } from "next";
import User from "../../models/User";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const reqBody = req.body;

        const { type, data } = reqBody;

        console.log(type, data);

        switch (type) {
          case "user.created": {
            console.log("user.created");
            const user = new User({
              clerk_id: data.id,
              firstName: data.first_name,
              lastName: data.last_name,
              email: data.email_addresses.find(
                email => email.id === data.primary_email_address_id
              ).email_address,
              imageUrl: data.profile_image_url,
            });

            console.log(user);

            user.save((err, user) => {
              if (err) {
                return res.status(400).json({ error: err.message });
              } else {
                return res.status(200).json({ data: user });
              }
            });

            break;
          }
          case "user.updated": {
            const user = await User.findOneAndUpdate(
              { clerk_id: data.id },
              {
                firstName: data.first_name,
                lastName: data.last_name,
                email: data.email_addresses.find(
                  email => email.id === data.primary_email_address_id
                ).email_address,
                imageUrl: data.profile_image_url,
              }
            );

            if (!user) {
              return res.status(404).json({ error: "User not found" });
            }
            res.status(200).json({ data: user });

            break;
          }

          case "user.deleted": {
            const user = await User.findOneAndDelete({
              clerk_id: data.id,
            });

            if (!user) {
              return res.status(404).json({ error: "User not found" });
            }
            res.status(200).json({ data: user });

            break;
          }
        }
        // console.log(req.body);
        // res.status(200).json({
        //   message: "Clerk created successfully",
        // });
      } catch (err) {
        return res.status(500).json({
          error: err.message,
        });
      }
      break;

    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
export default handler;
