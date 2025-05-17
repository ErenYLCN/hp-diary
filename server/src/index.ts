import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

mongoose
  .connect(`mongodb+srv://admin:${process.env.DB_PASSWORD}@hp-diary-db.5fcu8zb.mongodb.net/?retryWrites=true&w=majority&appName=hp-diary-db`)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

export default app;
