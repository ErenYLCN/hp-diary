import { Document, Types } from "mongoose";

// Global type definitions for time units and string values
type Unit = "Years" | "Year" | "Yrs" | "Yr" | "Y" | "Weeks" | "Week" | "W" | "Days" | "Day" | "D" | "Hours" | "Hour" | "Hrs" | "Hr" | "H" | "Minutes" | "Minute" | "Mins" | "Min" | "M" | "Seconds" | "Second" | "Secs" | "Sec" | "s" | "Milliseconds" | "Millisecond" | "Msecs" | "Msec" | "Ms";

type UnitAnyCase = Unit | Uppercase<Unit> | Lowercase<Unit>;

type StringValue = `${number}` | `${number}${UnitAnyCase}` | `${number} ${UnitAnyCase}`;

// User interface based on the User model
interface IUser extends Document {
  _id: Types.ObjectId;
  email: string;
  password: string;
  name?: string | null;
  profilePicture?: string;
  authMethods?: {
    local?: boolean;
    google?: boolean;
  };
  googleId?: string | null;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Extend Express Request interface to include user property
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export { IUser, Unit, UnitAnyCase, StringValue };
