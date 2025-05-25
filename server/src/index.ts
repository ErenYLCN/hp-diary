import express from "express";
import cors from "cors";
import { PORT } from "./config/env";
import userRouter from "./routes/user.routes";
import authRouter from "./routes/auth.routes";
import connectToDatabase from "./database/mongodb";
import errorMiddleware from "./middlewares/error.middleware";
import cookieParser from "cookie-parser";

// Initialize express app
const app = express();

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:5173", // Allow your frontend
    credentials: true, // Allow cookies to be sent
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Start the server with proper error handling
try {
  app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);

    try {
      await connectToDatabase();
      console.log("Connected to database");
    } catch (error) {
      console.error("Database connection failed:", error);
      process.exit(1);
    }
  });
} catch (error) {
  console.error("Failed to start server:", error);
  process.exit(1);
}

// Routes
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

// Error handling middleware
app.use(errorMiddleware);

export default app;
