import express, { Request, Response } from "express";
import { PORT, DB_USERNAME, DB_PASSWORD } from "./config/env";
import mongoose from "mongoose";

const app = express();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (_: Request, res: Response) => {
  res.send("Hello World!");
});



mongoose
  .connect(`mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@hp-diary-db.5fcu8zb.mongodb.net/?retryWrites=true&w=majority&appName=hp-diary-db`)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

export default app;
