import express from "express";
import authRouter from "@/routes/authRoutes";
import chatbotRouter from "@/routes/chatbotRoutes";

const app = express.Router();

app.use("/auth", authRouter);
app.use("/chatbot", chatbotRouter);

export default app;
