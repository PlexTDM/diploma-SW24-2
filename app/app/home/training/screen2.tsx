import { ThemeText, ThemeView } from "@/components";
import { ScrollView } from "react-native";
import { languages, useLanguage } from "@/lib/language";
import { View } from "react-native";
import { useState } from "react";
import { Pressable } from "react-native";
import { Text } from "react-native";

type Option = "Gym" | "Home";

const options: Option[] = ["Gym", "Home"];


const timeOptions: Record<Option, string[]> = {
  Gym: ["20min", "30min", "40min", "50min", "60min", "80min"],
  Home: ["7min", "10min", "15min", "25min", "35min", "45min"],
};

export default function Screen1() {
  const { language } = useLanguage();
  const [selectedOption, setSelectedOption] = useState<"Gym" | "Home">('Gym');
  const [selectedTime, setSelectedTime] = useState<string>("");
  return (
    <ScrollView>
      <ThemeView className="p-8">
        <ThemeText className="text-4xl font-bold">
          {languages[language].training.custom}
        </ThemeText>
        <ThemeText className="mt-3">
          {languages[language].training.custom1}
        </ThemeText>
        <ThemeText className="text-3xl font-bold mt-8">
          {languages[language].training.location}
        </ThemeText>
        <View className="flex-row mt-3 gap-2">
          {options.map((option, index) => {
            const isSelected = selectedOption === option;

            return (
              <Pressable
                key={index}
                onPress={() => setSelectedOption(option)}
                className={`w-32 py-5 rounded-xl items-center ${
                  isSelected ? "bg-black" : "bg-gray-300"
                }`}
              >
                <Text
                  className={`text-base font-bold ${
                    isSelected ? "text-white" : "text-black"
                  }`}
                >
                  {option}
                </Text>
              </Pressable>
            );
          })}
        </View>
        <ThemeText className="text-3xl font-bold mt-8">
          {languages[language].training.wtype}</ThemeText>
        <ThemeText className="text-3xl font-bold mt-8">{languages[language].training.time}</ThemeText>
        <View className="flex-row mt-3 gap-2 w-full flex-wrap">
          {timeOptions[selectedOption].map((option, index) => {
            const isSelected = selectedTime === option;

            return (
              <Pressable
                key={index}
                onPress={() => setSelectedTime(option)}
                className={`w-32 py-5 rounded-xl items-center ${
                  isSelected ? "bg-black" : "bg-gray-300"
                }`}
              >
                <Text
                  className={`text-base font-bold ${
                    isSelected ? "text-white" : "text-black"
                  }`}
                >
                  {option}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ThemeView>
    </ScrollView>
  );
}
