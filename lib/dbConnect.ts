// import mongoose, { Connection, createConnection } from "mongoose";

// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// const dbConnect = async () => {
//   if (cached.conn) {
//     return cached.conn;
//   }

//   if (!cached.conn) {
//     const opts = {
//       bufferCommands: false,
//     };

//     cached.promise = mongoose
//       .connect(process.env.MONGODB_URI, opts)
//       .then(mongoose => {
//         console.log("Connected to MongoDB");
//         return mongoose;
//       })
//       .catch(err => {
//         console.log("Error connecting to MongoDB: ", err.message);
//       });
//   }
//   cached.conn: Connection = await cached.promise;
//   return cached.conn;
// };

// export default dbConnect;

import type { Connection } from "mongoose";
import { createConnection } from "mongoose";

let conn: Connection;

export default function dbConnect() {
  if (conn) {
    return conn;
  }

  conn = createConnection(process.env.MONGODB_URI);
  return conn;
}
