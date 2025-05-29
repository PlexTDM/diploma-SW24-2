import express from "express";
import authRouter from "@/routes/authRoutes";
import chatbotRouter from "@/routes/chatbotRoutes";
import postRouter from "@/routes/postRoutes";

const app = express.Router();

app.use("/auth", authRouter);
app.use("/chatbot", chatbotRouter);
app.use("/post", postRouter);

export default app;
