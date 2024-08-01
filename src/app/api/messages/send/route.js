import { authenticate } from "@/middleware/authMiddleware";
import connectMongo from "../../../../lib/mongodb";
import Message from "../../../../models/Message";
import ioHandler from "@/lib/socket";
import { sendMessage } from "@/lib/pusher";
import { getChannelKey } from "@/utils";
// import { getSession } from "next-auth/client";

export async function POST(req, res) {
  // const session = await getSession({ req });
  try {
    // ioHandler(req, res);
    const user = await authenticate(req);
    // console.log("req from server ", req.json());
    //   if (!session) {
    //     return res.status(401).json({ error: 'Unauthorized' });
    //   }

    await connectMongo();

    // if (req.method === "GET") {
    //   const { userId } = req.query;
    //   const messages = await Message.find({
    //     $or: [
    //       { from: user._id, to: userId },
    //       { from: userId, to: user.id_ },
    //     ],
    //   }).populate("from to");
    //   res.status(200).json(messages);
    // } else if (req.method === "POST") {
    const { to, message } = await req.json();
    console.log("message from api ", message);
    let channelId = await getChannelKey(user._id.toString(), to);
    const newMessage = new Message({
      from: user._id,
      to,
      channelId,
      message,
    });
    await newMessage.save();
    console.log("new message ", newMessage);
    await sendMessage("channelId", {
      from: user._id,
      to,
      channelId,
      message,
      fromName: user?.fName,
    });
    return new Response(
      JSON.stringify({ message: "Created Successfully", success: true }),
      {
        status: 200,
      }
    );
    // res.status(201).json(newMessage);
    // } else {
    //   res.status(405).end();
    // }
  } catch (error) {
    return new Response(
      JSON.stringify({ message: error.message, success: false }),
      {
        status: 500,
      }
    );
  }
}
