import { languages, useLanguage } from "@/lib/language";
import { useRegisterStore } from "@/lib/store";
import { useAppTheme } from "@/lib/theme";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Icon } from "react-native-paper";
import { ThemeText } from "..";
import LottieView from "lottie-react-native";

export default function Step1() {
  const { setField } = useRegisterStore();
  const { language } = useLanguage();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const choices = languages[language].register.steps.health.choices;

  const { theme } = useAppTheme();
  const iconColor = theme === "dark" ? "black" : "white";
  const handlePress = (index: number) => {
    setSelectedIndex(index);
    setField("goal", choices[index]);
  };

  return (
    <View className="flex-1 gap-auto justify-center items-center">
      <View className="flex items-center ">
        <View className="flex-row px-6">
          <View className="w-10 h-10">
            <View
              style={{
                flex: 1,
                backgroundColor: "transparent",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <LottieView
                source={require("@/assets/icons/gem.json")}
                autoPlay
                loop
                style={{
                  width: 80,
                  height: 45,
                  backgroundColor: "transparent",
                }}
              />
            </View>
          </View>
          <ThemeText className="text-3xl w-[90%] font-bold text-center">
            {languages[language].register.steps.health.title}
          </ThemeText>
        </View>
        <Text className="text-gray-300 text-xl w-[300px] font-semibold dark:text-gray-500 text-center mt-4">
          {languages[language].register.steps.health.desc}
        </Text>
      </View>
      <View className="my-4">
        {choices.map((choice, i) => (
          <Pressable
            key={i}
            onPress={() => handlePress(i)}
            className={`dark:bg-gray-900 p-5 mb-5 w-[330px] border-2 rounded-3xl relative ${
              selectedIndex === i
                ? "border-black dark:border-white"
                : "border-gray-200 dark:border-gray-700"
            }`}
          >
            {i === selectedIndex && (
              <View className="absolute -right-2 -top-2 rounded-full dark:text-black bg-black dark:bg-white p-1 items-center justify-center">
                <Icon source="check" size={16} color={iconColor} />
              </View>
            )}
            <Text
              className={`font-semibold text-lg ${
                selectedIndex === i
                  ? "text-black dark:text-white"
                  : "text-slate-500 dark:text-gray-300"
              }`}
            >
              {choice}
            </Text>
          </Pressable>
        ))}
      </View>
      <View className="mb-4"></View>
    </View>
  );
}
