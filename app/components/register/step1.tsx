import { languages, useLanguage } from "@/lib/language";
import { useRegisterStore } from "@/lib/store";
import { useAppTheme } from "@/lib/theme";
import { Image } from "expo-image";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Icon } from "react-native-paper";
import { ThemeText } from "..";

export default function Step1() {
  const { setField } = useRegisterStore();
  const { language } = useLanguage();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const choices = languages[language].register.steps.goal.choices;

  const { theme } = useAppTheme();

  const handlePress = (index: number) => {
    setSelectedIndex(index);
    setField("goal", choices[index]);
  };

  return (
    <View className="flex-1 gap-8 justify-center items-center">
      <View className="flex items-center">
        <View className="flex-row items-center">
          <View className="w-10 h-10">
            <Image
              source={require("@/assets/img/diamond.png")}
              style={{ width: "100%", height: "100%" }}
              contentFit="contain"
            />
          </View>
          <ThemeText className="text-3xl font-bold">
            {languages[language].register.steps.goal.title}
          </ThemeText>
        </View>
        <Text className="text-gray-600 dark:text-gray-200 text-center">
          {languages[language].register.steps.goal.desc}
        </Text>
      </View>
      <View className="my-4">
        {choices.map((choice, i) => (
          <Pressable
            key={i}
            onPress={() => handlePress(i)}
            className={`dark:bg-gray-800 p-4 mb-5 w-[300px] border-2 rounded-3xl relative ${
              selectedIndex === i
                ? "border-black dark:border-blue1"
                : "border-gray-200 dark:border-gray-200"
            }`}
          >
            {i === selectedIndex && (
              <View className="absolute -right-2 -top-2 rounded-full bg-black dark:bg-blue1 p-1 items-center justify-center">
                {/* <CheckIcon size={16} color="white" /> */}
                <Icon source="check" size={16} color="white" />
              </View>
            )}
            <Text
              className={`font-semibold text-lg ${
                selectedIndex === i
                  ? "text-black dark:text-blue1"
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
