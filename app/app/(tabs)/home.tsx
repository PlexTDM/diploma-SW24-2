import { Sleep, Water, Training, Steps, Calories } from "@/components/home 2";
import { ThemeText, ThemeView } from "@/components";
import Flame from "@/components/icons/Flame";
import { languages, useLanguage } from "@/lib/language";
import { useAppTheme } from "@/lib/theme";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, View } from "react-native";
import { Icon } from "react-native-paper";
import { useRouter } from "expo-router";

export default function Tab() {
  const { theme } = useAppTheme();
  const { language } = useLanguage();
  const router = useRouter();
  return (
    <ThemeView className="items-center p-8">
      <View className="w-full flex-row items-center justify-between border-b gap-2 border-gray-200 dark:border-gray-800 pb-4">
        <Pressable
          // onPress={() => router.push("/(chat)/chat")}
          className="rounded-full w-[40px] aspect-square items-center justify-center overflow-hidden"
        >
          <LinearGradient
            colors={["#8A24FF", "#BB80FF"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="rounded-full w-[40px] aspect-square items-center justify-center p-2"
          >
            <Image
              source={require("@/assets/icons/Chat.svg")}
              style={{ width: "100%", height: "100%" }}
            />
          </LinearGradient>
        </Pressable>
        <View className="flex-row items-center gap-2">
          <Pressable
            onPress={() => router.push("/Streak")}
            className="border rounded-full items-center justify-center relative w-[40px] aspect-square border-gray-200 dark:border-gray-800"
          >
            <Flame size={35} />
          </Pressable>
          <Pressable className="border rounded-full p-2 border-gray-200 dark:border-gray-800 w-[40px] aspect-square"></Pressable>
        </View>
      </View>
      <View className="w-full flex-row items-center justify-between mt-12">
        <ThemeText className="text-2xl font-bold">
          {languages[language].home.title}
        </ThemeText>
        <Icon
          source="chevron-right"
          size={24}
          color={theme === "light" ? "black" : "white"}
        />
      </View>

      <View className="flex-col items-center justify-between mt-6 gap-3 h-[400px]">
        <View className="flex-1 flex-row gap-3">
          <View className="flex-1 gap-3">
            <Steps />
            <Sleep />
          </View>
          <View className="flex-1 gap-3">
            <Water />
          </View>
        </View>

        <View className="flex-row gap-3 h-1/3">
          <Training />
          <Calories />
        </View>
      </View>
    </ThemeView>
  );
}
