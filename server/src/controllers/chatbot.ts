// src/controllers/ChatbotController.ts
import { Request, Response } from "express";
import { chatbotService } from "@/services/chatbot";
import { AuthenticatedRequest } from "@/types";

class ChatbotController {
  public static async sendMessage(req: Request, res: Response): Promise<void> {
    try {
      const { message, userId }: { message?: string; userId?: string } =
        req.body;

      if (!message || !userId) {
        res.status(400).json({ error: "Message and userId are required" });
        return;
      }

      const result = await chatbotService.sendMessage(userId, message);
      res.json(result);
    } catch (error: any) {
      console.error("Error in sendMessage:", error.message);
      res.status(500).json({ error: "Failed to process message" });
    }
  }

  public static async getConversationHistory(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const { id } = req.user;
      const history = await chatbotService.getConversationHistory(id);
      res.json({ history });
    } catch (error: any) {
      console.error("Error in getConversationHistory:", error.message);
      res.status(500).json({ error: "Failed to get conversation history" });
    }
  }

  public static async getRecentConversations(
    req: Request<{ userId: string }, any, any, { limit?: string }>,
    res: Response
  ): Promise<void> {
    try {
      const { userId } = req.params;
      const limit = parseInt(req.query.limit || "10", 10);
      const conversations = await chatbotService.getRecentConversations(
        userId,
        limit
      );
      res.json({ conversations });
    } catch (error: any) {
      console.error("Error in getRecentConversations:", error.message);
      res.status(500).json({ error: "Failed to get recent conversations" });
    }
  }

  public static async clearConversation(
    req: Request<{ userId: string }>,
    res: Response
  ): Promise<void> {
    try {
      const { userId } = req.params;
      const messages = await chatbotService.clearConversation(userId);
      res.json({ messages });
    } catch (error: any) {
      console.error("Error in clearConversation:", error.message);
      res.status(500).json({ error: "Failed to clear conversation" });
    }
  }
}

export default ChatbotController;
