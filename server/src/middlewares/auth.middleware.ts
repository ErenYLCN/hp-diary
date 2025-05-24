import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import { IUser } from "../types/express";
import { verifyAccessToken } from "../utils/token.utils";

const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      res.status(401).json({
        success: false,
        message: "Unauthorized access, no token provided",
      });
      return;
    }

    const decoded = verifyAccessToken(token);

    const user = await User.findById((decoded as { userId: string }).userId).select("-password -__v");

    if (!user) {
      res.status(401).json({
        success: false,
        message: "User not found",
      });

      return;
    }

    req.user = user as IUser;

    next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An error occurred";
    res.status(401).json({
      success: false,
      message: "Unauthorized access",
      error: errorMessage,
    });
  }
};

export default authMiddleware;
