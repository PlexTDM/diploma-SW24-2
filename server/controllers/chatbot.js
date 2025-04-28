import express from 'express';
import { chatbotService } from '../services/chatbot.js';

const router = express.Router();

// Send message to chatbot
router.post('/message', async (req, res) => {
  try {
    const { message, userId } = req.body;

    if (!message || !userId) {
      return res.status(400).json({
        error: 'Message and userId are required'
      });
    }

    const result = await chatbotService.sendMessage(userId, message);
    res.json(result);
  } catch (error) {
    console.error('Error in /chatbot/message:', error);
    res.status(500).json({ error: 'Failed to process message' });
  }
});

// Get conversation history
router.get('/history/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const history = await chatbotService.getConversationHistory(userId);
    res.json({ history });
  } catch (error) {
    console.error('Error in /chatbot/history:', error);
    res.status(500).json({ error: 'Failed to get conversation history' });
  }
});

// Get recent conversations
router.get('/recent/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { limit = 10 } = req.query;
    const conversations = await chatbotService.getRecentConversations(userId, parseInt(limit));
    res.json({ conversations });
  } catch (error) {
    console.error('Error in /chatbot/recent:', error);
    res.status(500).json({ error: 'Failed to get recent conversations' });
  }
});

// Clear conversation
router.delete('/clear/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const messages = await chatbotService.clearConversation(userId);
    res.json({ messages });
  } catch (error) {
    console.error('Error in /chatbot/clear:', error);
    res.status(500).json({ error: 'Failed to clear conversation' });
  }
});

export default router; 