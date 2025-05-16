import type { RedisService } from "@/services/redis";

declare global {
  interface UserPayload {
    id: string;
    role: "ADMIN" | "USER";
  }
  namespace Express {
    interface Request {
      redis: RedisService;
      user: UserPayload;
    }
  }
  type AuthenticatedRequest<TBody = any> = Express.Request<any, any, TBody> & {
    user: UserPayload;
    redis: RedisService;
  };
}
