import { ThemeView, ThemeText } from "@/components";
import { useFocusEffect, useRouter } from "expo-router";
import { BellIcon, EllipsisVerticalIcon } from "lucide-react-native";
import { View } from "react-native";
import { Pressable } from "react-native";
import { useAppTheme } from "@/lib/theme";
import { languages, useLanguage } from "@/lib/language";
import { useEffect, useState } from "react";

export default async function Tab() {
  const router = useRouter();
  const { theme } = useAppTheme();
  const { language } = useLanguage();

  return (
    <ThemeView className="items-center p-8">
      <View className="w-full flex-row items-center justify-end border-b border-gray-200 dark:border-gray-800 pb-4">
        <Pressable onPress={() => router.push("/(auth)/welcome")}>
          <ThemeText>Login</ThemeText>
        </Pressable>
        <BellIcon size={32} color={theme === "light" ? "black" : "white"} />
      </View>
      <View className="w-full flex-row items-center justify-between mt-4">
        <ThemeText className="text-2xl font-bold">
          {languages[language].home.title}
        </ThemeText>
        <EllipsisVerticalIcon
          size={24}
          color={theme === "light" ? "black" : "white"}
        />
      </View>

      <View className="flex-row flex-1 items-center justify-between mt-4 gap-6">
        <View className="border flex-1 rounded-lg p-4">
          <ThemeText>Steps: </ThemeText>
        </View>
        <View className="border flex-1">
          <ThemeText>Tab [Home]</ThemeText>
        </View>
      </View>
    </ThemeView>
  );
}
