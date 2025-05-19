import { languages, useLanguage } from "@/lib/language";
import { useRegisterStore } from "@/stores/register";
import { useAppTheme } from "@/lib/theme";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Icon } from "react-native-paper";
import { ThemeText } from "..";
import LottieView from "lottie-react-native";

export default function Step2() {
  const { setField } = useRegisterStore();
  const { language } = useLanguage();
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const choices = languages[language].register.steps.goal.choices;

  const { theme } = useAppTheme();
  const iconColor = theme === "dark" ? "black" : "white";
  const handlePress = (index: number) => {
    setSelectedIndex(index);
    setField("goal", choices[index]);
  };

  return (
    <View className="flex-1  mt-28 items-center">
      <View className="flex items-center">
        <View className="flex-row items-center">
          <View className="w-[55px] h-12 items-center">
            <LottieView
              source={require("@/assets/icons/gem.json")}
              autoPlay
              loop
              style={{
                width: 80,
                height: 45,
              }}
            />
          </View>
          <ThemeText className="text-3xl font-bold mr-6 ">
            {languages[language].register.steps.goal.title}
          </ThemeText>
        </View>
        <Text className="text-gray-300 text-lg w-[300px] font-semibold dark:text-gray-500 text-center mt-4">
          {languages[language].register.steps.goal.desc}
        </Text>
      </View>
      <View className="my-4">
        {choices.map((choice, i) => (
          <Pressable
            key={i}
            onPress={() => handlePress(i)}
            className={`dark:bg-gray-900 p-5 mb-6 w-[330px] border-2 rounded-3xl relative ${
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
    </View>
  );
}
