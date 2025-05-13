import { RedisService } from "@/services/redis";
import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      redis: RedisService;
    }
  }
}

type UserRoles = "admin" | "user";

interface UserPayload {
  id: string;
  role: "ADMIN" | "USER";
}

interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    role: "ADMIN" | "USER";
  };
}
