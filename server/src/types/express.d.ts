import { Document, Types } from "mongoose";

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

export { IUser };
