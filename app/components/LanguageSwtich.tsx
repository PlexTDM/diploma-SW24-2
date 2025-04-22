import { Pressable, Text, View } from "react-native";
import { Moon, Sun } from "lucide-react-native";
import { useAppTheme } from "@/lib/theme";
import { useLanguage } from "@/lib/language";

export function LangSwitch() {
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
            <Sun size={20} color="orange" />
            <Text className="text-black">mn</Text>
          </>
        ) : (
          <>
            <Moon size={20} color="white" />
            <Text className="text-white">en</Text>
          </>
        )}
      </View>
    </Pressable>
  );
}
