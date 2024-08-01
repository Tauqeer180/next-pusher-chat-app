// lib/mongodb.js
import mongoose from "mongoose";
// import { GridFSBucket } from "mongodb";
const connectMongo = async () => {
  try {
    console.log("Mongoose ", mongoose?.connections[0].readyState);
    if (mongoose.connections[0].readyState) {
      console.log("already connected");
      return mongoose.connection;
    }
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // console.log("connected now ", conn);
    return conn.connection;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("May be IP is not whitelisted");
  }
};
// const getGridFSBucket = async () => {
//   const connection = await connectMongo();
//   return new GridFSBucket(connection.db, { bucketName: "pdfs" });
// };
// export { getGridFSBucket };
export default connectMongo;
