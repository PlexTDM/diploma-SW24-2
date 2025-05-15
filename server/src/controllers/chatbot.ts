// src/controllers/ChatbotController.ts
import { Request, Response } from "express";
import { chatbotService } from "@/services/chatbot";
import { AuthenticatedRequest } from "@/types";

class ChatbotController {
  public static async sendMessage(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<any> {
    try {
      const { message } = req.body;

      if (!message || typeof message !== "string")
        return res.status(400).json({ error: "Message is required" });

      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");
      res.flushHeaders();

      await chatbotService.sendMessageStream(req.user.id, message, res);
    } catch (error: any) {
      console.error("Error in sendMessage:", error.message);
      res.write(
        "event: error\ndata: " +
          JSON.stringify({ error: "Failed to process message" }) +
          "\n\n"
      );
      res.end();
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
