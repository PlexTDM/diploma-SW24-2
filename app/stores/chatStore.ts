import { create } from "zustand";
import EventSource from "react-native-sse";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ChatState {
  messages: Message[];
  isLoading: boolean;
  isSending: boolean;
  error: string | null;

  sendMessage: (
    message: string,
    onChunk: (chunk: string) => void
  ) => Promise<string | undefined>;
  clearChat: () => Promise<void>;
  getConversationHistory: () => Promise<void>;
}

const api = process.env.EXPO_PUBLIC_API_URL as string;

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  isLoading: false,
  isSending: false,
  error: null,

  sendMessage: async (message: string, onChunk: (chunk: string) => void) => {
    set({ isSending: true });
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");

      return new Promise((resolve, reject) => {
        const es = new EventSource(`${api}/chatbot/message`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        });

        let result = "";

        es.addEventListener("message", (event) => {
          if (!event.data) return;
          if (event.data === "end") {
            es.close();
            return resolve(result);
          }
          try {
            const data = JSON.parse(event.data);
            if (data.text) {
              result += data.text;
              onChunk(data.text);
            }
          } catch (err) {
            console.warn("Failed to parse SSE chunk:", event.data, err);
          }
        });
        es.addEventListener("error", (err) => {
          console.error("Connection error:", err);
          es.close();
          reject(err);
        });

        es.addEventListener("close", () => {
          es.close();
          resolve(result);
        });

        return () => {
          es.removeAllEventListeners();
          es.close();
        };
      });
    } catch (error) {
      console.error("Error sending message:", error);
      set({ error: "Failed to send message" });
    } finally {
      set({ isSending: false });
    }
  },

  clearChat: async () => {
    try {
      set({ isLoading: true, error: null });
      const accessToken = await AsyncStorage.getItem("accessToken");
      const response = await fetch(`${api}/chatbot/clear`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to clear chat");
      }

      set({ messages: [] });
    } catch (error) {
      console.error("Error clearing chat:", error);
      set({ error: "Failed to clear chat" });
    } finally {
      set({ isLoading: false });
    }
  },

  getConversationHistory: async () => {
    try {
      set({ isLoading: true, error: null });
      const accessToken = await AsyncStorage.getItem("accessToken");
      const response = await fetch(`${api}/chatbot/history`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to get conversation history");
      }

      const data = await response.json();
      set({ messages: data.history as Message[] });
    } catch (error) {
      console.error("Error getting conversation history:", error);
      set({ error: "Failed to get conversation history" });
    } finally {
      set({ isLoading: false });
    }
  },
}));
