import { ThemeText } from "@/components";
import { languages, useLanguage } from "@/lib/language";
import { useAppTheme } from "@/lib/theme";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native";

export default function Water() {
  const router = useRouter();
  const { theme } = useAppTheme();
  const { language } = useLanguage();

  return (
    <Pressable
      style={{
        elevation: 5,
      }}
      className="border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-800 flex-col flex-1 justify-between rounded-[26px] p-4"
    >
      <View className="flex-row items-center justify-between">
        <ThemeText className="flex-1">Walk</ThemeText>
        <View className="w-[25px] h-[20px]">
          <Image
            source={require("@/assets/icons/Shoe.svg")}
            style={{ width: "100%", height: "100%" }}
          />
        </View>
      </View>

      <View>
        <ThemeText className="text-2xl font-bold">3500</ThemeText>
        <ThemeText className="text-sm font-normal">
          {languages[language].steps.steps}
        </ThemeText>
      </View>
    </Pressable>
  );
}
