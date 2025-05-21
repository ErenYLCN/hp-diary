import express from "express";
import { PORT } from "./config/env";
import userRouter from "./routes/user.routes";
import authRouter from "./routes/auth.routes";
import connectToDatabase from "./database/mongodb";
import errorMiddleware from "./middlewares/error.middleware";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  await connectToDatabase();
});

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

app.use(errorMiddleware);

export default app;
