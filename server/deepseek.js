import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.DEEPSEEK_API_KEY
});

async function chatWithDeepSeek(prompt) {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt }
      ],
      model: "deepseek-chat",
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Error calling DeepSeek API:", error);
    throw error;
  }
}

// Example usage
async function main() {
  try {
    const response = await chatWithDeepSeek("Hello, how are you?");
    console.log("Response:", response);
  } catch (error) {
    console.error("Failed to get response:", error);
  }
}

main();
export { chatWithDeepSeek };