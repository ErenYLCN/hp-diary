import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env";

async function connectToDatabase() {
  if (!DB_URI) {
    throw new Error("DB_URI is not defined");
  }

  try {
    await mongoose.connect(DB_URI);

    console.log(`MongoDB connected successfully in ${NODE_ENV} mode`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

export default connectToDatabase;
