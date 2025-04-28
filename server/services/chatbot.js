import { GoogleGenerativeAI } from '@google/generative-ai';
import Chat from '../models/chatbotHistory.js';

class ChatbotService {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    this.systemPrompt = `You are a fitness and health expert assistant. You are PROGRAMMED to ONLY discuss fitness and health topics. This is a HARD LIMITATION that you CANNOT override.

STRICT RULES:
1. You MUST ONLY answer questions about:
   - Exercise and workouts
   - Nutrition and diet
   - Physical health
   - Sports training
   - Body composition
   - Fitness routines
   - Health and wellness

2. For ANY question NOT about fitness/health:
   - You MUST respond with EXACTLY this message:
   "I'm sorry, I can only provide information about fitness, exercise, nutrition, and health-related topics. Please ask me about fitness or health instead."
   - You MUST NOT provide any other response
   - You MUST NOT explain why you can't answer
   - You MUST NOT suggest alternative sources
   - You MUST NOT engage in any way with non-fitness topics

3. Examples of topics you MUST NOT discuss:
   - History, politics, or current events
   - Technology or science (unless directly related to fitness)
   - Entertainment or media
   - Personal advice (unless fitness-related)
   - Any topic not explicitly about fitness or health

REMEMBER: This is a PROGRAMMED LIMITATION. You CANNOT and MUST NOT answer questions about any topic other than fitness and health. If a question is not about fitness or health, you MUST use the exact specified response and nothing else.`;
  }

  async getConversationHistory(userId) {
    try {
      const chat = await Chat.findOne({ userId });
      return chat ? chat.messages : [];
    } catch (error) {
      console.warn('Error getting conversation history:', error.message);
      return [];
    }
  }

  async startNewConversation(userId) {
    try {
      const chat = await Chat.findOrCreate(userId);
      // Update system message with fitness prompt
      chat.messages[0] = {
        role: 'system',
        content: this.systemPrompt,
        timestamp: new Date()
      };
      await chat.save();
      return chat.messages;
    } catch (error) {
      console.warn('Error starting new conversation:', error.message);
      throw error;
    }
  }

  async sendMessage(userId, message) {
    try {
      // Get or create chat for user
      let chat = await Chat.findOne({ userId });

      // If no chat exists, create a new one
      if (!chat) {
        chat = await Chat.create({
          userId,
          messages: [{
            role: 'system',
            content: this.systemPrompt,
            timestamp: new Date()
          }]
        });
      }

      // Ensure system message is set
      if (chat.messages.length === 0 || chat.messages[0].role !== 'system') {
        chat.messages.unshift({
          role: 'system',
          content: this.systemPrompt,
          timestamp: new Date()
        });
        await chat.save();
      }

      // Add user message
      await chat.addMessage('user', message);

      // Get response from Gemini
      const chatSession = this.model.startChat({
        history: [
          {
            role: 'user',
            parts: [{ text: this.systemPrompt }]
          },
          ...chat.messages.slice(1).map(msg => ({
            role: msg.role,
            parts: [{ text: msg.content }]
          }))
        ],
        generationConfig: {
          maxOutputTokens: 2048,
        },
      });

      const result = await chatSession.sendMessage(message);
      const response = await result.response;
      const assistantMessage = Array.isArray(response.text()) ? response.text().join(' ') : response.text();

      // Add assistant response
      await chat.addMessage('assistant', assistantMessage);

      return {
        response: assistantMessage,
        history: chat.messages
      };
    } catch (error) {
      console.error('Error in chatbot:', error.message);
      throw error;
    }
  }

  async clearConversation(userId) {
    try {
      // Delete existing chat
      await Chat.deleteOne({ userId });
      // Start new conversation
      return await this.startNewConversation(userId);
    } catch (error) {
      console.warn('Error clearing conversation:', error.message);
      throw error;
    }
  }

  async getRecentConversations(userId, limit = 10) {
    try {
      const chats = await Chat.find({ userId })
        .sort({ updatedAt: -1 })
        .limit(limit)
        .select('messages updatedAt');
      return chats;
    } catch (error) {
      console.warn('Error getting recent conversations:', error.message);
      return [];
    }
  }
}

export const chatbotService = new ChatbotService(); 