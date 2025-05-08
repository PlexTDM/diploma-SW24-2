import { Text, Pressable } from "react-native";
import React from "react";
import { ThemeView } from "@/components";
import { useRouter } from "expo-router";

export default function ProfileLogin() {
  const router = useRouter();
  return (
    <ThemeView className="items-center justify-center">
      <Pressable onPress={() => router.push("/(auth)/welcome")}>
        <Text className="text-blue-700 dark:text-gray-300 underline text-sm">
          Login
        </Text>
      </Pressable>
    </ThemeView>
  );
}
