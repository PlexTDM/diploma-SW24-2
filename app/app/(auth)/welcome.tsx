import { View, Text, TouchableHighlight } from "react-native";
import React, { useCallback } from "react";
import { languages } from "@/lib/language";
import { useLanguage } from "@/lib/language";
import { Image } from "expo-image";
import { Button } from "react-native-paper";
import { ArrowLeft } from "lucide-react-native";
import { useFocusEffect, useNavigation, useRouter } from "expo-router";
import { useRegisterStore } from "@/lib/store";
import { ThemeText, ThemeView } from "@/components";
import { useAppTheme } from "@/lib/theme";

export default function LoginOrRegister() {
  const router = useRouter();
  const { theme } = useAppTheme();
  const { setField, progress } = useRegisterStore();
  const navigation = useNavigation();
  const { language } = useLanguage();
  const handleRegister = () => {
    // router.push("/(auth)/register");
    router.push("/(auth)/register");
  };
  const handleLogin = () => {
    router.push("/(auth)/login");
  };
  const handleBack = () => {
    if (navigation.canGoBack()) {
      router.back();
    } else {
      router.push("/(tabs)");
    }
  };
  useFocusEffect(
    useCallback(() => {
      setField("progress", 0);
    }, [])
  );
  return (
    <ThemeView className="dark:bg-blue1 relative flex-1 items-center p-6 justify-between">
      <View className="h-[60px] w-full relative items-start justify-start">
        <Button
          className="absolute top-0 left-0"
          mode="text"
          rippleColor={"#FFf00020"}
          onPress={handleBack}
        >
          <ArrowLeft size={40} color={theme === "dark" ? "white" : "black"} />
        </Button>
      </View>

      <View className="w-3/4 relative aspect-square overflow-hidden mx-auto">
        <Image
          source={require("@/assets/mascot/default.png")}
          style={{ width: "100%", height: "100%" }}
          cachePolicy={"memory-disk"}
          contentFit={"contain"}
          focusable={false}
        />
      </View>
      <View>
        <ThemeText className="text-3xl text-blue1 dark:text-white font-bold text-center">
          {/* {languages[language].login.title1} */}
          {languages[language].mascot.name}
        </ThemeText>
        <ThemeText className="text-2xl text-gray-500 dark:text-gray-100 text-center">
          {/* {languages[language].login.title2} */}
          {languages[language].mascot.desc}
        </ThemeText>
      </View>
      <View className="w-3/4 mx-auto gap-4">
        <TouchableHighlight
          onPress={handleRegister}
          className="bg-blue1 dark:bg-white rounded-full p-3 items-center"
          activeOpacity={0.9}
          underlayColor={"#DDDDDD"}
        >
          <Text className="text-lg text-white dark:text-blue1 text-center">
            {languages[language].login.button1}
          </Text>
        </TouchableHighlight>
        <Button
          mode={"text"}
          textColor={theme === "dark" ? "white" : "#708FFF"}
          rippleColor={"#FFf00020"}
          onPress={handleLogin}
        >
          {languages[language].login.button2}
        </Button>
      </View>
    </ThemeView>
  );
}
