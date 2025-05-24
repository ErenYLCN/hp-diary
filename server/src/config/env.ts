import { config } from "dotenv";
import { StringValue } from "../types/express";

config({ path: `.env.${process.env.NODE_ENV || "development"}` });

// Define the required environment variables
const requiredEnvVars = ["PORT", "DB_URI", "JWT_SECRET", "JWT_EXPIRES", "JWT_REFRESH_SECRET", "JWT_REFRESH_EXPIRES"] as const;

// Create a type for our environment variables
type EnvVars = {
  PORT: string;
  NODE_ENV: string;
  DB_URI: string;
  JWT_SECRET: string;
  JWT_EXPIRES: StringValue | number;
  JWT_REFRESH_SECRET: string;
  JWT_REFRESH_EXPIRES: StringValue | number;
};

// Function to validate that all required environment variables are defined
export function validateEnv(): EnvVars {
  const missingVars: string[] = [];

  requiredEnvVars.forEach((varName) => {
    if (!process.env[varName]) {
      missingVars.push(varName);
    }
  });

  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(", ")}`);
  }

  return {
    PORT: process.env.PORT!,
    NODE_ENV: process.env.NODE_ENV || "development",
    DB_URI: process.env.DB_URI!,
    JWT_SECRET: process.env.JWT_SECRET!,
    JWT_EXPIRES: process.env.JWT_EXPIRES! as StringValue | number,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!,
    JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES! as StringValue | number,
  };
}

// Export validated environment variables
export const { PORT, NODE_ENV, DB_URI, JWT_SECRET, JWT_EXPIRES, JWT_REFRESH_SECRET, JWT_REFRESH_EXPIRES } = validateEnv();
