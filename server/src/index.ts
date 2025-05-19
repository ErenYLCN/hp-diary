import express from "express";
import { PORT } from "./config/env";
import userRouter from "./routes/user.routes";
import authRouter from "./routes/auth.routes";
import connectToDatabase from "./database/mongodb";

const app = express();

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  await connectToDatabase();
});

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

export default app;
