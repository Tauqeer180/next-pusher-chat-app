import connectMongo from "@/lib/mongodb";
import { authenticate } from "@/middleware/authMiddleware";
import User from "@/models/User";

export async function GET(request) {
  try {
    await connectMongo();
    let user = await authenticate(request);
    const data = await User.find({ _id: { $ne: user?._id } });
    // console.log("Testimoinials from api ", data);
    return new Response(
      JSON.stringify({ data: data, success: true, status: 200 }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: error?.message || "Something went wrong!",
        success: false,
      }),
      {
        status: 500,
      }
    );
  }
}
