import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useAppTheme } from "@/lib/theme";
import { Ionicons } from "@expo/vector-icons";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useChatStore } from "@/stores/chatStore";
import MessageBubble from "@/components/chat/messageBubble";
import Header from "@/components/chat/Header";
import { StatusBar } from "expo-status-bar";
// import CameraTracking from "@/components/cameraTracking";

const LoadingIndicator = () => {
  const { theme } = useAppTheme();
  return (
    <View className="flex-row items-center my-4 justify-center gap-2 px-4">
      <ActivityIndicator
        size="small"
        color={theme === "dark" ? "#9CA3AF" : "#6B7280"}
      />
      <Text className="text-sm text-gray-500 dark:text-gray-400">
        Loading history...
      </Text>
    </View>
  );
};

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [streamingMessageId, setStreamingMessageId] = useState<string | null>(
    null
  );
  const { theme } = useAppTheme();
  const insets = useSafeAreaInsets();
  const {
    sendMessage,
    getConversationHistory,
    clearChat,
    isSending,
    isLoading,
    error,
    messages: storeMessages,
  } = useChatStore();

  useEffect(() => {
    getConversationHistory();
  }, [getConversationHistory]);

  useEffect(() => {
    if (storeMessages?.length > 0) {
      const convertedMessages = storeMessages?.filter(
        (msg) => msg.role !== "system"
      );
      setMessages(convertedMessages.reverse() as Message[]);
    } else {
      setMessages([
        {
          id: "init-1",
          content: "Hello! I'm your AI assistant.",
          role: "model",
          timestamp: new Date(),
        },
      ]);
    }
  }, [storeMessages]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputText.trim(),
      role: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [userMessage, ...prev]);
    setInputText("");

    const botMessageId = (Date.now() + 1).toString();
    const newBotMessagePlaceholder: Message = {
      id: botMessageId,
      content: "",
      role: "model",
      timestamp: new Date(),
    };
    setMessages((prev) => [newBotMessagePlaceholder, ...prev]);
    setStreamingMessageId(botMessageId);

    try {
      await sendMessage(userMessage.content, (chunk) => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMessageId
              ? { ...msg, content: msg.content + chunk }
              : msg
          )
        );
      });
    } catch (err) {
      console.error("AI stream error in handleSend:", err);
      setMessages((prevMsgs) =>
        prevMsgs.map((msg) =>
          msg.id === botMessageId
            ? { ...msg, content: "[Error connecting to AI. Please try again.]" }
            : msg
        )
      );
    } finally {
      setStreamingMessageId(null);
    }
  };

  useEffect(() => {
    if (error && messages.length > 0) {
      const currentStreamingMessage = messages.find(
        (m) => m.id === streamingMessageId
      );
      if (currentStreamingMessage && currentStreamingMessage.role === "model") {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === streamingMessageId ? { ...msg, content: error } : msg
          )
        );
      } else if (error && !streamingMessageId) {
        console.warn("Chat store general error:", error);
      }
    }
  }, [error, messages, streamingMessageId]);

  const handleClearChat = () => {
    clearChat();
  };

  return (
    <SafeAreaView
      className="dark:bg-[#1A202C] bg-white flex-1"
      edges={["top", "bottom"]}
    >
      {/* <CameraTracking /> */}
      <StatusBar style={theme === "dark" ? "light" : "dark"} hidden={false} />
      <Header title="Chatbot" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="dark:bg-gray-900 bg-white flex-1"
        keyboardVerticalOffset={Platform.OS === "ios" ? 35 : 0}
      >
        <FlatList
          inverted={true}
          data={messages}
          renderItem={({ item }) => (
            <MessageBubble
              key={item.id}
              message={item}
              isCurrentlyStreaming={item.id === streamingMessageId}
              setCurrentStreamingMessageId={setStreamingMessageId}
            />
          )}
          keyExtractor={(item) => item.id}
          className="flex-1 px-4 pb-12"
          contentContainerClassName="pb-4"
          ListFooterComponent={
            isLoading && messages.length === 0 ? <LoadingIndicator /> : null
          }
        />

        {/* meow input */}
        <View
          className="flex-row items-center px-4 py-2 border-t border-gray-200 dark:border-gray-800"
          style={{ paddingBottom: insets.bottom + 8 }}
        >
          <Pressable
            onPress={handleClearChat}
            disabled={isSending || isLoading}
            className="p-2 mr-2"
          >
            <Ionicons
              name="trash-outline"
              size={24}
              color={
                isSending || isLoading
                  ? theme === "dark"
                    ? "#4B5563"
                    : "#D1D5DB"
                  : theme === "dark"
                  ? "#9CA3AF"
                  : "#6B7280"
              }
            />
          </Pressable>

          <TextInput
            className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full px-5 py-3 mr-2 text-gray-900 dark:text-gray-100 text-base"
            placeholder="Type a message..."
            placeholderTextColor={theme === "dark" ? "#9CA3AF" : "#6B7280"}
            value={inputText}
            onChangeText={setInputText}
            multiline
            submitBehavior="blurAndSubmit"
            returnKeyType="send"
            onSubmitEditing={handleSend}
            editable={!isSending && !isLoading}
            style={{ textAlignVertical: "top" }}
          />
          <Pressable
            onPress={handleSend}
            disabled={!inputText.trim() || isSending || isLoading}
            className={`w-10 h-10 rounded-full items-center justify-center ${
              inputText.trim() && !isSending && !isLoading
                ? "bg-blue-500"
                : "bg-gray-300 dark:bg-gray-700"
            }`}
          >
            {isSending ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Ionicons
                name="send"
                size={20}
                color={
                  inputText.trim() && !isSending && !isLoading
                    ? "white"
                    : theme === "dark"
                    ? "#4B5563"
                    : "#9CA3AF"
                }
              />
            )}
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
