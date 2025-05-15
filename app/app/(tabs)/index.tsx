import { Sleep, Water, Training, Steps, Calories } from "@/components/home";
import { ThemeView, ThemeText } from "@/components";
import Flame from "@/components/icons/Flame";
import { languages, useLanguage } from "@/lib/language";
import { useAppTheme } from "@/lib/theme";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, View, Text , ScrollView} from "react-native";
import { useRouter } from "expo-router";
import { SectionTitle } from '@/components/ui/SectionTitle';
import FortuneCookie from '@/components/home/FortuneCookie';
import DailyTasks from "@/components/home/DailyTasks";
export default function Tab() {
  const { theme } = useAppTheme();
  const { language } = useLanguage();
  const router = useRouter();

  return (
    <ThemeView className="items-center p-8">
     <ScrollView>
      <View className="w-full flex-row items-center justify-between  gap-2  pb-4">
        <Pressable
          android_ripple={{ color: "white", radius: 20 }}
          onPress={() => router.push("/chatbot")}
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
      <View className="flex-row items-center justify-between w-full">
        <FortuneCookie />
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

      <View className="mt-3 w-full">
        <DailyTasks />
        </View>
        
      </ScrollView>
    </ThemeView>
  );
}
