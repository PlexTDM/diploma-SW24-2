import React, { useState, useEffect, useRef } from "react";
import { View, Text, useColorScheme, Animated } from "react-native";
import LottieView from "lottie-react-native";
import { languages, useLanguage } from "@/lib/language";
import { useRouter } from "expo-router";

const Asuult5 = () => {
  const { language } = useLanguage();
  const question5 = languages[language].question5;

  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const textColor = isDark ? "text-white" : "text-black";
  const backgroundColor = isDark ? "bg-[#1e1e1e]" : "bg-white";

  const router = useRouter();

  const [progress, setProgress] = useState(new Animated.Value(0));
  const [progressText, setProgressText] = useState("0%");

  const animationRef = useRef(null);

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 6000,
      useNativeDriver: false,
    }).start();

    const interval = setInterval(() => {
      setProgressText((prevText) => {
        const currentValue = parseInt(prevText);
        if (currentValue < 100) {
          return `${currentValue + 20}%`;
        }
        return "100%";
      });
    }, 1000);

    const timer = setTimeout(() => {
      router.replace("/(tabs)/stats");
    }, 6000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <View className={`flex-1 justify-end items-center px-5 pb-40 ${backgroundColor}`}>
      {/* Overlayed DotLottie Animation */}
      <View className="absolute top-10 left-0 right-0 items-center mt-10">
        <LottieView
          ref={animationRef}
          source={require("@/assets/mascot/bluvifood.json")}
          loop
          autoPlay
          style={{ width: 400, height: 420 }} // Equivalent to w-48 h-48
        />

      </View>

      {/* Text Section */}
      <View className="items-center mb-8">
        <Text className={`text-lg font-bold text-center ${textColor}`}>
          {question5.zori}
        </Text>
      </View>

      {/* Progress Bar */}
      <View className="w-full items-center">
        <View className="w-full h-2 bg-gray-200 rounded-full">
          <Animated.View
            style={{
              width: progress.interpolate({
                inputRange: [0, 1],
                outputRange: ["0%", "100%"],
              }),
            }}
            className="h-full bg-blue-600 rounded-full"
          />
        </View>

        {/* Progress Percentage Text under the bar */}
        <Text className={`text-base mt-2 ${textColor}`}>
          {progressText}
        </Text>
      </View>
    </View>
  );
};

export default Asuult5;
