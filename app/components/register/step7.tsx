import { languages, useLanguage } from "@/lib/language";
import { useRegisterStore } from "@/stores/register";
import { useAppTheme } from "@/lib/theme";
import { useState } from "react";
import { Text, View, ScrollView } from "react-native";
import StepHeader from "./StepHeader";
import ChoiceButton from "./ChoiceButton";

export default function Step7() {
  const { setField } = useRegisterStore();
  const { language } = useLanguage();
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const choices = languages[language].register.steps.health.choices;
  const healthTitle = languages[language].register.steps.health.title;
  const healthDesc = languages[language].register.steps.health.desc;

  const { theme } = useAppTheme();
  const iconColor = theme === "dark" ? "black" : "white";
  const handlePress = (index: number) => {
    setSelectedIndex(index);
    setField("healthCondition", choices[index]);
  };

  return (
    <View className="flex-1 mt-24 items-center">
      <View className="flex items-center">
        <StepHeader title={healthTitle} />
        <Text className="text-gray-300 text-lg w-[300px] font-semibold dark:text-gray-500 text-center mt-4">
          {healthDesc}
        </Text>
      </View>
      <ScrollView scrollEnabled>
        <View className="space-y-4 my-4 w-full px-14">
          {choices.map((choice, i) => (
            <ChoiceButton
              key={i}
              choice={choice}
              isSelected={selectedIndex === i}
              onPress={() => handlePress(i)}
              iconColor={iconColor}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
