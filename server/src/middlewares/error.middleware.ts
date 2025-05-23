import { NextFunction, Request, Response } from "express";
import AppError from "../utils/app-error";

const errorMiddleware = (err: Error | AppError, req: Request, res: Response, next: NextFunction) => {
  try {
    let error = { ...err } as AppError;
    error.message = err.message;

    console.error(err);

    // Mongoose bad ObjectId
    if (err.name === "CastError") {
      const message = "Resource not found";
      error = new AppError(message, 404);
    }

    // Mongoose duplicate key
    if ("code" in err && err.code === 11000) {
      const message = "Duplicate field value entered";
      error = new AppError(message, 400);
    }

    //Mongoose validation error
    if (err.name === "ValidationError" && "errors" in err) {
      const message = Object.values(err.errors as Record<string, { message: string }>)
        .map((val: { message: string }) => val.message)
        .join(", ");
      error = new AppError(message, 400);
    }

    res.status((error as AppError).statusCode || 500).json({
      success: false,
      message: error.message || "Server Error",
    });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
