import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { Button } from "react-native-paper";
import { ArrowLeft } from "lucide-react-native";
import { useNavigation, useRouter } from "expo-router";
import { useRegisterStore } from "@/lib/store";

export default function ProgressBar() {
  const { progress } = useRegisterStore();
  const router = useRouter();
  const navigaton = useNavigation();
  const maxStep = 2;
  const progressValue = useSharedValue(progress / maxStep);

  useEffect(() => {
    progressValue.value = withTiming(Math.min(progress / maxStep, 1), {
      duration: 500,
      easing: Easing.inOut(Easing.quad),
    });
  }, [progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${progressValue.value * 100}%`,
  }));

  const handleBack = () => {
    if (navigaton.canGoBack()) {
      router.back();
    } else {
      router.push("/(tabs)");
    }
  };

  return (
    <View className="flex-row w-full items-center px-4 h-[60px]">
      <Button
        className="top-0 left-0"
        mode="text"
        textColor="white"
        rippleColor={"#FFf00020"}
        onPress={handleBack}
      >
        <ArrowLeft size={40} color={"white"} />
      </Button>
      <View className="flex-1 h-6 bg-white/80 rounded-full p-0.5 overflow-hidden relative">
        <View className="flex-1">
          <Animated.View
            style={[
              animatedStyle,
              {
                backgroundColor: "#3b82f6",
                borderRadius: 999,
                position: "absolute",
                inset: 0,
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
}
