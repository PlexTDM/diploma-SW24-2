import { Text, Pressable } from "react-native";
import React, { use } from "react";
import { ThemeView, ThemeText } from "@/components";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import { languages, useLanguage } from "@/lib/language";
import { AuthContext } from "@/context/auth";

export default function ProfileLogin() {
  const { language } = useLanguage();
  const router = useRouter();
  const { logout } = use(AuthContext);

  return (
    <ThemeView className="flex-1 items-center justify-center bg-white dark:bg-black">
      <Image
        source={require("@/assets/img/logo.png")}
        style={{ width: 100, height: 100, marginBottom: 10 }}
      />

      <ThemeText className="text-xl text-center text-black dark:text-white font-semibold">
        {languages[language].Login}
      </ThemeText>

      <Pressable
        onPress={() => router.push("/(auth)/welcome")}
        className="bg-blue-600 dark:bg-gray-700 px-6 py-2 rounded-full mt-6"
      >
        <Text className="text-white dark:text-gray-200 text-base font-medium">
          {languages[language].login.button1}
        </Text>
      </Pressable>
      <Pressable
        className="bg-blue-600 dark:bg-gray-700 px-6 py-2 rounded-full mt-6"
        onPress={() => {
          logout();
        }}
      >
        <Text className="text-white dark:text-gray-200 text-base font-medium">
          logout
        </Text>
      </Pressable>
    </ThemeView>
  );
}
