import React, { useState } from "react";
import { View, Text } from "react-native";
import WheelPickerExpo from "react-native-wheel-picker-expo";
import { ItemType } from "react-native-wheel-picker-expo/lib/typescript/types";

export default function Step3() {
  const [selectedValue, setSelectedValue] = useState<number>(60);
  return (
    <View className="w-screen p-6 h-full flex-1 overflow-hidden items-center justify-center">
      <Text className="text-white text-2xl">Your Height :{selectedValue}</Text>
      <WheelPickerExpo
        backgroundColor="#708FFF"
        width={70}
        height={400}
        items={[...Array(100).keys()].map((num) => ({
          label: `${num + 1}`,
          value: num + 1,
        }))}
        initialSelectedIndex={20}
        onChange={(item: { index: number; item: ItemType }) =>
          setSelectedValue(item.item.value)
        }
        renderItem={(props) => (
          <Text className="text-white text-5xl h-min">{props.label}</Text>
        )}
      />
    </View>
  );
}
