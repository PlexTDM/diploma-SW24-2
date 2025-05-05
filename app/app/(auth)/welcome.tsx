import { ThemeText, ThemeView } from "@/components";
import { languages, useLanguage } from "@/lib/language";
import { useRegisterStore } from "@/lib/store";
import { useAppTheme } from "@/lib/theme";
import { Image } from "expo-image";
import { useFocusEffect, useNavigation, useRouter } from "expo-router";
import React, { useCallback } from "react";
import { Text, TouchableHighlight, View } from "react-native";
import { Button, Icon } from "react-native-paper";

export default function LoginOrRegister() {
  const router = useRouter();
  const { theme } = useAppTheme();
  const { setField } = useRegisterStore();
  const navigation = useNavigation();
  const { language } = useLanguage();
  const handleRegister = () => {
    // router.push("/(auth)/signup");
    router.push("/(auth)/register");
  };
  const handleLogin = () => {
    router.push("/(auth)/login");
  };
  const handleBack = () => {
    if (navigation.canGoBack()) {
      router.back();
    } else {
      router.push("/(tabs)/home");
    }
  };
  useFocusEffect(
    useCallback(() => {
      setField("progress", 0);
    }, [setField])
  );
  return (
    <ThemeView className="dark:bg-blue1 relative flex-1 items-center pb-20 justify-between">
      <View className="h-[60px] w-full relative items-start justify-start">
        <Button
          className="absolute top-0 left-0"
          mode="text"
          rippleColor={"#FFf00020"}
          onPress={handleBack}
        >
          <Icon
            source="chevron-left"
            size={24}
            color={theme === "dark" ? "#fff" : "#000"}
          />
        </Button>
      </View>

      <View className="w-3/4 relative aspect-square overflow-hidden mx-auto">
        <Image
          source={require("@/assets/mascot/BluviSmile.png")}
          style={{ width: "100%", height: "100%" }}
          cachePolicy={"memory-disk"}
          contentFit={"contain"}
          focusable={false}
        />
      </View>
      <View>
        <ThemeText className="text-3xl mb-[40%] text-center ">
          {/* {languages[language].login.title2} */}
          {languages[language].mascot.desc}
        </ThemeText>
      </View>
      <View className="w-3/4 mx-auto flex flex-row items-center justify-center gap-4">
        <TouchableHighlight
          onPress={handleLogin}
          className=" border-[1px] border-black dark:bg-white rounded-full px-10 py-2 items-center "
          activeOpacity={0.9}
          underlayColor={"#DDDDDD"}
        >
          <Text className="text-lg text-black text-center">
            {languages[language].login.button1}
          </Text>
        </TouchableHighlight>
        <Button
          mode={"text"}
          textColor={theme === "dark" ? "white" : "white"}
          rippleColor={"#FFf00020"}
          buttonColor={theme === "dark" ? "#136CF1" : "black"}
          onPress={handleRegister}
          className="bg-blue1 dark:bg-white rounded-full px-6 items-center"
        >
          {languages[language].login.button2}
        </Button>
      </View>
    </ThemeView>
  );
}
