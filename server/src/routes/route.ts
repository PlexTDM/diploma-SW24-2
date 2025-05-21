import express from "express";
import authRouter from "@/routes/authRoutes";
import chatbotRouter from "@/routes/chatbotRoutes";
import { handler } from "@/services/edgestore";

const app = express.Router();

app.use("/auth", authRouter);
app.use("/chatbot", chatbotRouter);
app.use("/edgestore", handler);

export default app;
