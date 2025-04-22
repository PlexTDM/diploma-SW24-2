import { View, Text, TouchableHighlight } from "react-native";
import React, { useCallback } from "react";
import { languages } from "@/lib/language";
import { useLanguage } from "@/lib/language";
import { Image } from "expo-image";
import { Button } from "react-native-paper";
import { ArrowLeft } from "lucide-react-native";
import { useFocusEffect, useNavigation, useRouter } from "expo-router";
import { useRegisterStore } from "@/lib/store";

export default function LoginOrRegister() {
  const router = useRouter();
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
    <View className="relative bg-blue1 flex-1 items-center p-6 justify-between">
      <View className="h-[60px] w-full relative items-start justify-start">
        <Button
          className="absolute top-0 left-0"
          mode="text"
          textColor="white"
          rippleColor={"#FFf00020"}
          onPress={handleBack}
        >
          <ArrowLeft size={40} color={"white"} />
        </Button>
      </View>
      <View className="">
        <Text className="text-white text-3xl text-center">
          {languages[language].login.title1}
        </Text>
        <Text className="text-white text-2xl text-center">
          {languages[language].login.title2}
        </Text>
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
      <View className="w-3/4 mx-auto gap-4">
        <TouchableHighlight
          onPress={handleRegister}
          className="rounded-md bg-white p-3 items-center"
          activeOpacity={0.9}
          underlayColor={"#DDDDDD"}
        >
          <Text className="text-blue1 text-lg text-center">
            {languages[language].login.button1}
          </Text>
        </TouchableHighlight>
        <Button
          mode={"text"}
          textColor="white"
          rippleColor={"#FFf00020"}
          onPress={handleLogin}
        >
          {languages[language].login.button2}
        </Button>
      </View>
    </View>
  );
}
