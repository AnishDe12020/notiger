import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const dbConnect = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.conn) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(process.env.MONGODB_URI, opts)
      .then(mongoose => {
        console.log("Connected to MongoDB");
        return mongoose;
      })
      .catch(err => {
        console.log("Error connecting to MongoDB: ", err.message);
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
};

export default dbConnect;
