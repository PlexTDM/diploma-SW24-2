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
      <Text className="text-white">Your Age2: {selectedAge}</Text>
      <View className="mb-4">
        <WheelPickerExpo
          backgroundColor="#708FFF"
          width={70}
          height={400}
          items={[...Array(100).keys()].map((num) => ({
            label: `${num + 1}`,
            value: num + 1,
          }))}
          initialSelectedIndex={20}
          onChange={handleChange}
          renderItem={(props) => (
            <Text className="text-white text-5xl h-min">{props.label}</Text>
          )}
        />
      </View>
    </View>
  );
}
