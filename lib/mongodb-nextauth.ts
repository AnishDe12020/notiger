import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

const client: MongoClient = new MongoClient(uri);
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = client.connect();
  } else {
    clientPromise = global._mongoClientPromise;
  }
}

export default clientPromise;
