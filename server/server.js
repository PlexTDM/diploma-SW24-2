import express from 'express'
import cookieParser from 'cookie-parser'
import bp from 'body-parser'
import router from './routes/route.js'
import corsConfig from "./middleware/cors.js"
import limiter from './middleware/rateLimit.js'
import mongoose from 'mongoose'
import { redisMiddleware } from './middleware/redisMiddleware.js'
import os from 'os'

const app = express()

// app.use((req, res, next) => {
//   const ip = req.ip || req.socket.remoteAddress;
//   const ipPrefix = ip.split('.').slice(0, 2).join('.');
//   console.log(`Request from IP: ${ipPrefix}.*.* to ${req.method} ${req.url}`);
//   next();
// });

app.use(corsConfig)
app.use(express.json())
app.use(bp.urlencoded({ limit: '16mb', extended: true }))
app.use(cookieParser())
app.use(limiter)
app.use(redisMiddleware)
app.use(router)

const PORT = process.env.PORT || 3000;

try {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      const interfaces = os.networkInterfaces();
      const addresses = [];

      Object.keys(interfaces).forEach((interfaceName) => {
        interfaces[interfaceName].forEach((iface) => {
          if (iface.family === 'IPv4' && !iface.internal) {
            addresses.push(iface.address);
          }
        });
      });

      app.listen(PORT, () => {
        console.log(`Server listening on:`);
        console.log(`- Local: http://localhost:${PORT}`);
        addresses.forEach(addr => {
          console.log(`- Network: http://${addr}:${PORT}`);
        });
      });
    });
} catch (err) {
  console.log("Can't Connect to the server", err);
}