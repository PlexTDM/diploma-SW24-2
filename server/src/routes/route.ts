import express, { Request, Response } from "express";
import authRouter from "@/routes/authRoutes";
import chatbotRouter from "@/routes/chatbotRoutes";
const app = express.Router();

app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "hi nig" });
});

app.use("/auth", authRouter);
app.use("/chatbot", chatbotRouter);

export default app;
