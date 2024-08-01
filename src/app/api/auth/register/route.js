import bcrypt from "bcryptjs";
import connectMongo from "@/lib/mongodb";
import User from "@/models/User";
import jwt from "jsonwebtoken";

export async function POST(request) {
  await connectMongo();
  const { fName, lName, email, password } = await request.json();

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    fName,
    lName,
    email,
    userType: 1,
    password: hashedPassword,
  });
  // UserType
  // 0 Admin
  // 1 Normal User

  try {
    let user = await newUser.save();
    console.log(user);
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return new Response(
      JSON.stringify({
        message: "User created successfully",
        success: true,
        token,
        user: {
          fName: user?.fName || user?.username,
          lName: user?.lName,
          email: user?.email,
          userType: user?.userType,
          _id: user?._id,
        },
      }),
      {
        status: 201,
      }
    );
  } catch (error) {
    let message =
      error?.code == 11000 &&
      `${Object.keys(error?.keyValue)?.toString()} already exists`;
    return new Response(
      JSON.stringify({ message, error, status: 403, success: false }),
      {
        status: 403,
      }
    );
  }
}
