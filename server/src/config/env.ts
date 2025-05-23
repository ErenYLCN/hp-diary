import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || "development"}` });

// Define the required environment variables
const requiredEnvVars = ["PORT", "DB_URI", "JWT_SECRET"] as const;

// Create a type for our environment variables
type EnvVars = {
  PORT: string;
  NODE_ENV: string;
  DB_URI: string;
  JWT_SECRET: string;
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
  };
}

// Export validated environment variables
export const { PORT, NODE_ENV, DB_URI, JWT_SECRET } = validateEnv();
