import { View, Text, TextInput } from "react-native";
import React from "react";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { ThemeView } from "@/components";

export default function Chatbot() {
  return (
    <ThemeView className="p-8 bg-white">
      <View className="w-full h-14 justify-center">
        <TextInput
          placeholder="Search"
          clearButtonMode="always"
          autoCapitalize="none"
          autoCorrect={false}
          numberOfLines={1}
          className="px-4 border flex-1 border-gray-800 rounded-full text-gray-500"
          placeholderClassName="text-gray-500"
        />
      </View>
    </ThemeView>
  );
}
