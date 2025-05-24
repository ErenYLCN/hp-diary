import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import Session from "../models/session.model";
import AppError from "../utils/app-error";
import bcrypt from "bcryptjs";
import { NODE_ENV } from "../config/env";
import { IUser } from "../types/express";
import { generateAccessToken, generateRefreshToken, getRefreshTokenExpiry, getCookieOptions } from "../utils/token.utils";

export const signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { email, password, name } = req.body;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    if (!passwordRegex.test(password)) {
      throw new AppError("Password must be 8-20 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character (@$!%*?&)", 400);
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new AppError("User already exists", 409);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUsers = await User.create([{ name, email, password: hashedPassword, authMethods: { local: true, google: false } }], { session });

    const accessToken = generateAccessToken(newUsers[0]._id);
    const refreshToken = generateRefreshToken();
    const expiresAt = getRefreshTokenExpiry();

    await Session.create(
      [
        {
          userId: newUsers[0]._id,
          refreshToken,
          userAgent: req.get("User-Agent"),
          ipAddress: req.ip,
          expiresAt,
        },
      ],
      { session }
    );

    const cookieOptions = getCookieOptions(NODE_ENV === "production");
    res.cookie("refreshToken", refreshToken, cookieOptions);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        user: newUsers[0],
        accessToken,
      },
    });

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const signIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new AppError("Invalid email or password", 401);
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken();
    const expiresAt = getRefreshTokenExpiry();

    await Session.create({
      userId: user._id,
      refreshToken,
      userAgent: req.get("User-Agent"),
      ipAddress: req.ip,
      expiresAt,
    });

    const cookieOptions = getCookieOptions(NODE_ENV === "production");
    res.cookie("refreshToken", refreshToken, cookieOptions);

    res.status(200).json({
      success: true,
      message: "User signed in successfully",
      data: {
        user,
        accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      await Session.findOneAndUpdate({ refreshToken }, { isValid: false });
    }

    res.clearCookie("refreshToken");
    res.status(200).json({
      success: true,
      message: "User signed out successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw new AppError("Refresh token not provided", 401);
    }

    const session = await Session.findOne({
      refreshToken,
      isValid: true,
      expiresAt: { $gt: new Date() },
    }).populate("userId");

    if (!session || !session.userId) {
      throw new AppError("Invalid or expired refresh token", 401);
    }

    await Session.findByIdAndUpdate(session._id, {
      lastUsedAt: new Date(),
    });

    const user = session.userId as unknown as IUser;
    const newAccessToken = generateAccessToken(user._id);

    res.status(200).json({
      success: true,
      message: "Token refreshed successfully",
      data: {
        accessToken: newAccessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const revokeAllTokens = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      throw new AppError("User not authenticated", 401);
    }

    await Session.updateMany({ userId, isValid: true }, { isValid: false });

    res.clearCookie("refreshToken");
    res.status(200).json({
      success: true,
      message: "All tokens revoked successfully",
    });
  } catch (error) {
    next(error);
  }
};
