import { NextFunction, Request, Response } from "express";

interface ErrorWithStatus extends Error {
  statusCode?: number;
  code?: number;
  errors?: Record<string, { message: string }>;
  reason?: {
    value?: string;
    path?: string;
    kind?: string;
  };
}

const errorMiddleware = (err: ErrorWithStatus, req: Request, res: Response, next: NextFunction) => {
  try {
    let error = { ...err };

    error.message = err.message;

    console.error(err);

    // Mongoose bad ObjectId
    if (err.name === "CastError") {
      const message = "Resource not found";

      error = new Error(message);
      error.statusCode = 404;
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
      const message = "Duplicate field value entered";
      error = new Error(message);
      error.statusCode = 400;
    }

    //Mongoose validation error
    if (err.name === "ValidationError" && err.errors) {
      const message = Object.values(err.errors)
        .map((val: { message: string }) => val.message)
        .join(", ");
      error = new Error(message);
      error.statusCode = 400;
    }

    res.status(error.statusCode || 500).json({ success: false, message: error.message || "Server Error" });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
