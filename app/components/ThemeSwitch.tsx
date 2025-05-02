import { useAppTheme } from "@/lib/theme";
import React from "react";
import { Pressable, Text, View } from "react-native";

export function ThemeSwitch() {
  const { theme, setTheme } = useAppTheme();
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <Pressable onPress={toggleTheme}>
      <View className="flex-row items-center space-x-2 p-2 rounded-full bg-gray-200 dark:bg-gray-800">
        {theme === "light" ? (
          <>
            <Text className="text-black">Light</Text>
          </>
        ) : (
          <>
            <Text className="text-white">Dark</Text>
          </>
        )}
      </View>
    </Pressable>
  );
}
