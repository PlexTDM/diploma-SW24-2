import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { Image } from "expo-image";
import { useAppTheme } from "@/lib/theme";
import { Ionicons } from "@expo/vector-icons";
import { ThemeView } from "@/components";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const MessageBubble = ({ message }: { message: Message }) => {
  const { theme } = useAppTheme();
  const isUser = message.sender === "user";

  return (
    <View
      className={`flex-row ${isUser ? "justify-end" : "justify-start"} mb-4`}
    >
      {!isUser && (
        <View className="w-8 h-8 rounded-full bg-blue-500 mr-2 overflow-hidden">
          <Image
            source={require("@/assets/bluviSignup.png")}
            className="w-full h-full"
            contentFit="cover"
          />
        </View>
      )}
      <View
        className={`max-w-[80%] rounded-2xl px-4 py-2 ${
          isUser
            ? "bg-blue-500 dark:bg-blue-600"
            : "bg-gray-200 dark:bg-gray-800"
        }`}
      >
        <Text
          className={`text-base ${
            isUser ? "text-white" : "text-gray-900 dark:text-gray-100"
          }`}
        >
          {message.text}
        </Text>
        <Text
          className={`text-xs mt-1 ${
            isUser ? "text-blue-100" : "text-gray-500 dark:text-gray-400"
          }`}
        >
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </View>
    </View>
  );
};

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const scrollViewRef = useRef<ScrollView>(null);
  const { theme } = useAppTheme();
  const insets = useSafeAreaInsets();

  const sendMessage = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText("");

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm a helpful assistant. How can I help you today?",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  useEffect(() => {
    // Add initial bot message
    setMessages([
      {
        id: "1",
        text: "Hello! I'm your AI assistant. How can I help you today?",
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
  }, []);

  return (
    <ThemeView className="flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <ScrollView
          ref={scrollViewRef}
          className="flex-1 px-4"
          onContentSizeChange={() =>
            scrollViewRef.current?.scrollToEnd({ animated: true })
          }
        >
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </ScrollView>

        <View
          className="flex-row items-center px-4 py-2 border-t border-gray-200 dark:border-gray-800"
          style={{ paddingBottom: insets.bottom + 8 }}
        >
          <TextInput
            className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 mr-2 text-gray-900 dark:text-gray-100"
            placeholder="Type a message..."
            placeholderTextColor={theme === "dark" ? "#9CA3AF" : "#6B7280"}
            value={inputText}
            onChangeText={setInputText}
            multiline
          />
          <Pressable
            onPress={sendMessage}
            disabled={!inputText.trim()}
            className={`w-10 h-10 rounded-full items-center justify-center ${
              inputText.trim() ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-700"
            }`}
          >
            <Ionicons
              name="send"
              size={20}
              color={
                inputText.trim()
                  ? "white"
                  : theme === "dark"
                  ? "#9CA3AF"
                  : "#6B7280"
              }
            />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </ThemeView>
  );
}
