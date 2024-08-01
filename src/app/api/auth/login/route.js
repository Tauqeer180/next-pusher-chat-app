import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectMongo from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(request) {
  let checkConn = await connectMongo();
  console.log("check conn from Login  ", checkConn);
  const { email, password } = await request.json();

  const user = await User.findOne({ email });
  if (!user) {
    return new Response(
      JSON.stringify({ message: "Invalid credentials", success: false }),
      {
        status: 401,
      }
    );
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return new Response(
      JSON.stringify({ message: "Invalid credentials", success: false }),
      {
        status: 401,
      }
    );
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return new Response(
    JSON.stringify({
      token,
      user: {
        fName: user?.fName || user?.username,
        lName: user?.lName,
        email: user?.email,
        userType: user?.userType,
        _id: user?._id,
      },
      message: "logged in successfuly",
      success: true,
    }),
    { status: 200 }
  );
}
