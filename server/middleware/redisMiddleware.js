import { redisService } from '../services/redis.js';


export const redisMiddleware = (req, res, next) => {
  req.redis = redisService;
  next();
}; 