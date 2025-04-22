import { Pressable, Text, View } from "react-native";
import { Moon, Sun } from "lucide-react-native";
import { useAppTheme } from "@/lib/theme";

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
            <Sun size={20} color="orange" />
            <Text className="text-black">Light</Text>
          </>
        ) : (
          <>
            <Moon size={20} color="white" />
            <Text className="text-white">Dark</Text>
          </>
        )}
      </View>
    </Pressable>
  );
}
