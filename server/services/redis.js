import Redis from 'redis';
import { promisify } from 'util';

class RedisService {
  constructor() {
    this.client = null;
    this.isConnected = false;
    this.fallbackCache = new Map(); // In-memory fallback cache
    this.initialize();
  }

  async initialize() {
    try {
      const redisUrl = process.env.REDIS_URL;
      if (!redisUrl) {
        console.warn('REDIS_URL not found in environment variables, using fallback cache');
        return;
      }

      this.client = Redis.createClient({
        url: redisUrl,
        socket: {
          reconnectStrategy: (retries) => {
            if (retries > 10) {
              console.warn('Max reconnection attempts reached, using fallback cache');
              return null;
            }
            return Math.min(retries * 100, 3000);
          }
        }
      });

      // Handle connection events
      this.client.on('error', (error) => {
        console.warn('Redis error:', error.message);
        this.isConnected = false;
      });

      this.client.on('connect', async () => {
        try {
          this.isConnected = true;
          const result = await this.client.ping();
          if (result === 'PONG') {
            console.log('Redis connected and responding successfully');
          } else {
            console.warn('Redis ping returned unexpected result:', result);
            this.isConnected = false;
          }
        } catch (error) {
          console.warn('Redis ping failed:', error.message);
          this.isConnected = false;
        }
      });

      this.client.on('end', () => {
        console.warn('Redis connection ended');
        this.isConnected = false;
      });

      // Connect to Redis
      await this.client.connect();

      // Promisify Redis methods
      this.getAsync = promisify(this.client.get).bind(this.client);
      this.setAsync = promisify(this.client.set).bind(this.client);
      this.delAsync = promisify(this.client.del).bind(this.client);

    } catch (error) {
      console.warn('Failed to initialize Redis, using fallback cache:', error.message);
      this.isConnected = false;
    }
  }

  async get(key) {
    if (!key) {
      console.warn('Attempted to get with null/undefined key');
      return null;
    }

    try {
      if (this.isConnected && this.client) {
        const result = await this.getAsync(key);
        if (result) {
          console.log('Redis get successful for key:', key);
        }
        return result;
      }
      console.warn('Using fallback cache for get:', key);
      return this.fallbackCache.get(key);
    } catch (error) {
      console.warn('Error getting from Redis, using fallback cache:', error.message);
      return this.fallbackCache.get(key);
    }
  }

  async set(key, value, expireTime = 3600) {
    if (!key || value === undefined) {
      console.warn('Attempted to set with null/undefined key or value');
      return;
    }

    try {
      if (this.isConnected && this.client) {
        await this.setAsync(key, value, 'EX', expireTime);
        console.log('Successfully cached in Redis:', key);
      } else {
        console.warn('Using fallback cache for set:', key);
      }
      // Always update fallback cache
      this.fallbackCache.set(key, value);
      // Set expiration for fallback cache
      setTimeout(() => {
        this.fallbackCache.delete(key);
      }, expireTime * 1000);
    } catch (error) {
      console.warn('Error setting in Redis, using fallback cache:', error.message);
      this.fallbackCache.set(key, value);
      setTimeout(() => {
        this.fallbackCache.delete(key);
      }, expireTime * 1000);
    }
  }

  async delete(key) {
    if (!key) {
      console.warn('Attempted to delete with null/undefined key');
      return;
    }

    try {
      if (this.isConnected && this.client) {
        await this.delAsync(key);
        console.log('Successfully deleted from Redis:', key);
      } else {
        console.warn('Using fallback cache for delete:', key);
      }
      this.fallbackCache.delete(key);
    } catch (error) {
      console.warn('Error deleting from Redis:', error.message);
      this.fallbackCache.delete(key);
    }
  }

  isRedisAvailable() {
    return this.isConnected;
  }
}

export const redisService = new RedisService(); 