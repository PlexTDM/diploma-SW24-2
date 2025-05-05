import { useLanguage } from "@/lib/language";
import React from "react";
import { Pressable, Text, View } from "react-native";

const LangSwitch = () => {
  const { language, setLanguage } = useLanguage();
  const toggleLang = () => {
    const newLang = language === "en" ? "mn" : "en";
    setLanguage(newLang);
  };

  return (
    <Pressable onPress={toggleLang}>
      <View className="flex-row items-center space-x-2 p-2 rounded-full bg-gray-200 dark:bg-gray-800">
        {language === "mn" ? (
          <>
            <Text className="text-black">mn</Text>
          </>
        ) : (
          <>
            <Text className="text-white">en</Text>
          </>
        )}
      </View>
    </Pressable>
  );
};

export default LangSwitch;
