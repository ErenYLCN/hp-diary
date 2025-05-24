import jwt from "jsonwebtoken";
import crypto from "crypto";
import { Types } from "mongoose";
import { JWT_SECRET, JWT_EXPIRES, JWT_REFRESH_EXPIRES } from "../config/env";
import { MS_IN_MONTH } from "./time.utils";

export const generateAccessToken = (userId: Types.ObjectId): string => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
};

export const generateRefreshToken = (): string => {
  return crypto.randomBytes(64).toString("hex");
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};

export const getRefreshTokenExpiry = (): Date => {
  const expiryValue = JWT_REFRESH_EXPIRES;
  let expiryMs: number;

  if (typeof expiryValue === "number") {
    expiryMs = expiryValue;
  } else {
    const timeValue = expiryValue.match(/^(\d+)(.*)$/);
    if (!timeValue) throw new Error("Invalid refresh token expiry format");

    const num = parseInt(timeValue[1]);
    const unit = timeValue[2].toLowerCase();

    switch (unit) {
      case "d":
      case "day":
      case "days":
        expiryMs = num * 24 * 60 * 60 * 1000;
        break;
      case "h":
      case "hour":
      case "hours":
        expiryMs = num * 60 * 60 * 1000;
        break;
      case "m":
      case "min":
      case "minute":
      case "minutes":
        expiryMs = num * 60 * 1000;
        break;
      case "s":
      case "sec":
      case "second":
      case "seconds":
        expiryMs = num * 1000;
        break;
      default:
        expiryMs = num * 24 * 60 * 60 * 1000;
    }
  }

  return new Date(Date.now() + expiryMs);
};

export const getCookieOptions = (isProduction: boolean) => {
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: "strict" as const,
    maxAge: typeof JWT_REFRESH_EXPIRES === "number" ? JWT_REFRESH_EXPIRES : MS_IN_MONTH,
    path: "/",
  };
};
