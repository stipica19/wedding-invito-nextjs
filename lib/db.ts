import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
    console.warn("MONGODB_URI is not set. Database connection is stubbed.");
}

type MongooseCache = {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
};

const globalForMongoose = globalThis as typeof globalThis & {
    mongoose?: MongooseCache;
};

const cached = globalForMongoose.mongoose ?? { conn: null, promise: null };

globalForMongoose.mongoose = cached;

export async function connectToDatabase() {
    if (!MONGODB_URI) {
        return cached.conn;
    }

    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI);
    }

    cached.conn = await cached.promise;
    return cached.conn;
}
