import React from "react";
import { View } from "react-native";
import { Text } from "react-native";
import { ThemeView, ThemeText } from "@/components";
import { Image } from "expo-image";
import { StyleSheet } from "react-native";
import { languages, useLanguage } from "@/lib/language";
import { Button } from "react-native-paper";
import { useRouter } from "expo-router";
import { Pressable } from "react-native";

export default function start() {
  const { language } = useLanguage();
  const router = useRouter();
  return (
    <ThemeView className="p-8">
      <View className="w-full h-[50%] bg-gray-200 rounded-3xl">
        <Image
          source={require("@/assets/beetch.png")}
          style={[
            StyleSheet.absoluteFillObject,
            { width: "100%", height: "100%", borderRadius: 20 },
          ]}
          cachePolicy={"memory-disk"}
          contentFit={"cover"}
          focusable={false}
        />
      </View>
      <ThemeText className="font-bold text-4xl mt-5 w-[80%]">
        {languages[language].training.measure}
      </ThemeText>
      <ThemeText className="mt-5 text-xl">
        {languages[language].training.test}
      </ThemeText>
      <View className="absolute bottom-5 left-5 right-5">
        <Pressable onPress={() => router.push("/home/training/screen2")}>
          <Button
            mode="contained"
            className="rounded-xl"
            contentStyle={{ paddingVertical: 12, backgroundColor: "white" }}
          >
            <Text className="text-black font-bold">I'll Do it Later</Text>
          </Button>
        </Pressable>
      </View>
      <View className="absolute bottom-28 left-5 right-5">
        <Pressable onPress={() => router.push("/home/training/screen2")}>
          <Button
            mode="contained"
            className="rounded-xl"
            contentStyle={{ paddingVertical: 12, backgroundColor: "black" }}
          >
            Start
          </Button>
        </Pressable>
      </View>
    </ThemeView>
  );
}
