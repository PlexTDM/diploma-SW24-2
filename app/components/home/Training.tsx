import { useLanguage, languages } from "@/lib/language";
import { View, Text, Pressable } from "react-native";
import { useAppTheme } from "@/lib/theme";
import { ThemeText } from "@/components";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export default function Training() {
  const { language } = useLanguage();
  const { theme } = useAppTheme();
  const router = useRouter();

  const pressed = useSharedValue(0);

  const handlePressIn = () => {
    pressed.value = withTiming(1, { duration: 150 });
  };

  const handlePressOut = () => {
    pressed.value = withTiming(0, { duration: 150 });
  };

  const handlePress = () => {
    router.push("/home/training");
  };

  const animatedStyle = useAnimatedStyle(() => {
    const blurRadius = interpolate(pressed.value, [0, 1], [2, 5]);
    const color = interpolateColor(
      pressed.value,
      [0, 1],
      theme === "dark" ? ["#ffffff60", "#ffffff00"] : ["#00000040", "#00000030"]
    );
    const boxShadow = `0px 0px ${blurRadius} 0px ${color}`;
    return {
      boxShadow,
      transform: [
        {
          scale: interpolate(pressed.value, [0, 1], [1, 0.99]),
        },
      ],
    };
  });

  return (
    <Animated.View
      className="dark:bg-black-900 rounded-[26px] flex-1 dark:border-gray-800 border-[1px] border-gray-200"
      style={animatedStyle}
    >
      <Pressable
        className="flex-1 justify-between p-4 px-6"
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
      >
        <View className="flex-row items-center justify-between">
          <ThemeText className="flex-1 font-bold text-lg">
            {languages[language].training.workout}
          </ThemeText>
          <View className="w-[25px] h-[20px]">
            <Image
              source={require("@/assets/icons/dumbbell.svg")}
              style={{ width: "100%", height: "100%" }}
            />
          </View>
        </View>

        <View>
          <Text className="text-2xl text-gray-700 dark:text-gray-200 font-semibold">
            12,000
          </Text>
          <Text className="text-sm font-normal text-slate-400">
            {languages[language].training.duration}
          </Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}
