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
}

export type AuthenticatedRequest<
  P = Record<string, string>,
  ResBody = any,
  ReqBody = any,
  ReqQuery = Query
> = Request<P, ResBody, ReqBody, ReqQuery> & {
  user: UserPayload;
  redis: RedisService;
};
