import express from "express";
import ChatbotController from "@/controllers/chatbot";
const app = express.Router();

app.post("/message", ChatbotController.sendMessage);
app.get("/history/:userId", ChatbotController.getConversationHistory);
app.get("/recent/:userId", ChatbotController.getRecentConversations);
app.delete("/clear/:userId", ChatbotController.clearConversation);

export default app;
