import jwt from "jsonwebtoken";
import connectMongo from "@/lib/mongodb";
import User from "@/models/User";

export const authenticate = async (request) => {
  const token = request.headers.get("Authorization")?.split(" ")[1];

  if (!token) {
    throw new Error("No token provided");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //
    console.log("Decoded ", decoded);

    let checkConn = await connectMongo();
    // console.log("check conn ", checkConn);
    // const user = await User.find();
    const user = await User.findById(decoded.id);
    // const user = await User.find({ _id: decoded.id });
    //
    // const user = null;
    console.log("user from middleware ", user);
    if (!user) {
      throw new Error("Invalid token");
    }
    return user;
  } catch (error) {
    console.log("token validation failed ", error);
    throw new Error("Expired / malformed Token");
  }
};

export const optionalAuthentication = async (request) => {
  const token = request.headers.get("Authorization")?.split(" ")[1];

  if (!token) {
    return { user: null };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    let checkConn = await connectMongo();
    const user = await User.findById(decoded.id);
    if (!user) {
      return { user: null };
    }
    return user;
  } catch (error) {
    return { user: null };
  }
};
