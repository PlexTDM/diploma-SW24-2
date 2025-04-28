import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  messages: [{
    role: {
      type: String,
      enum: ['system', 'user', 'assistant'],
      required: true
    },
    content: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Create compound index for faster queries
chatSchema.index({ userId: 1, createdAt: -1 });

// Method to add a new message
chatSchema.methods.addMessage = function (role, content) {
  this.messages.push({
    role,
    content,
    timestamp: new Date()
  });
  this.updatedAt = new Date();
  return this.save();
};

// Static method to find or create chat for user
chatSchema.statics.findOrCreate = async function (userId) {
  let chat = await this.findOne({ userId });
  if (!chat) {
    chat = await this.create({
      userId,
      messages: [{
        role: 'system',
        content: 'You are a helpful assistant.',
        timestamp: new Date()
      }]
    });
  }
  return chat;
};

const Chat = mongoose.model('ChatBotHistory', chatSchema);

export default Chat; 