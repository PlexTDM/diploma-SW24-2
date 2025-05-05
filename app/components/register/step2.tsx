import { useRouter } from "expo-router";
import { useRegisterStore } from "@/lib/store";
import { Text, View } from "react-native";
import { useState } from "react";
import WheelPickerExpo from "react-native-wheel-picker-expo";
import { ItemType } from "react-native-wheel-picker-expo/lib/typescript/types";
import { languages, useLanguage } from "@/lib/language";
import { useDebouncedCallback } from "use-debounce";

export default function Step1() {
  const { setField } = useRegisterStore();
  const { language } = useLanguage();
  const [selectedAge, setSelectedAge] = useState<string>("0");

  const handleChange = useDebouncedCallback(({ item }: { item: ItemType }) => {
    setSelectedAge(item.label);
    setField("age", item.label);
  }, 100);

  return (
    <View className="w-screen justify-center items-center">
      <Text className="text-black">hiinee ndd itge</Text>
    </View>
  );
}
