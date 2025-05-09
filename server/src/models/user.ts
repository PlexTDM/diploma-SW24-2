import mongoose, { Document, Schema, Model } from "mongoose";

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface IUser extends Document {
  email: string;
  stats?: Record<string, any>;
  password: string;
  role: Role;
  bio?: string;
  image?: string | null;
  isEmailVerified: boolean;
  emailVerificationToken: string;
  emailVerificationTokenExpiry: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the schema
const userSchema: Schema<IUser> = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
    },
    stats: {
      type: Schema.Types.Mixed,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.USER,
      required: true,
    },
    bio: {
      type: String,
      maxlength: 500,
      default: "Hello this is my Bio",
    },
    image: {
      type: String,
      default: null,
    },
    isEmailVerified: { type: Boolean, default: false },
    emailVerificationToken: { type: String, required: true },
    emailVerificationTokenExpiry: { type: Date, required: true },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
export default User;
