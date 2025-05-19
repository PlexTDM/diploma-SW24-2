import express, { Request, Response, NextFunction } from "express";
import { Express } from "express-serve-static-core";
import cookieParser from "cookie-parser";
import bp from "body-parser";
import { redisMiddleware } from "@/middleware/redisMiddleware";
import limiter from "@/middleware/rateLimit";
import corsConfig from "@/middleware/cors";
import router from "@/routes/route";
import os from "os";
import dotenv from "dotenv";
import connectToMongoDB from "./services/mongodb";

dotenv.config();

const app: Express = express();

// Log requests
app.use((req: Request, _res: Response, next: NextFunction) => {
  let ip = req.ip || req.socket.remoteAddress || "unknown";
  if (ip.startsWith("::ffff:")) ip = ip.replace("::ffff:", "IPv4 ");
  console.log(`Request IP: ${ip}`);

  next();
});

app.use(bp.urlencoded({ limit: "16mb", extended: true }));
app.use(redisMiddleware);
app.use(express.json());
app.use(cookieParser());
app.use(corsConfig);
app.use(limiter);
app.use(router);

const PORT = process.env.PORT || 3000;

connectToMongoDB().then(() => {
  const interfaces = os.networkInterfaces();
  const addresses: string[] = [];

  Object.keys(interfaces).forEach((interfaceName) => {
    const ifaceGroup = interfaces[interfaceName];
    ifaceGroup?.forEach((iface) => {
      if (iface.family === "IPv4" && !iface.internal) {
        addresses.push(iface.address);
      }
    });
  });

  app.listen(PORT, () => {
    console.log(`Server listening on:`);
    console.log(`- Local: http://localhost:${PORT}`);
    addresses.forEach((addr) => {
      console.log(`- Network: http://${addr}:${PORT}`);
    });
  });
});
