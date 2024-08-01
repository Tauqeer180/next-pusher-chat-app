import { authenticate } from "@/middleware/authMiddleware";
import connectMongo from "../../../../lib/mongodb";
import Message from "../../../../models/Message";
import ioHandler from "@/lib/socket";
import User from "@/models/User";
// import { getSession } from "next-auth/client";

export async function GET(req, res) {
  try {
    // ioHandler(req, res);
    const user = await authenticate(req);
    const { searchParams } = new URL(req.url);
    const userId = searchParams?.get("userId");
    const otherUser = await User.findById({ _id: userId });
    console.log("Other user ", otherUser);
    await connectMongo();

    // if (req.method === "GET") {
    // console.log("Req ----------->>>>> ", req);
    // console.log("=========== ", param);
    // const { userId } = req.query;
    console.log("From id  ===>>> ", otherUser?._id);
    console.log("To id  ===>>> ", user?._id);
    const messages = await Message.find({
      $or: [
        { from: user._id, to: otherUser?._id },
        { from: otherUser?._id, to: user._id },
      ],
    }).populate("from to");

    return new Response(
      JSON.stringify({
        // message: "Created Successfully",
        data: messages,
        success: true,
      }),
      {
        status: 200,
      }
    );
    // res.status(201).json(newMessage);
    // } else {
    //   res.status(405).end();
    // }
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: error.message, success: false }),
      {
        status: 500,
      }
    );
  }
}
