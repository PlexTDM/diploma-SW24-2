import { useLanguage ,languages} from "@/lib/language";
import { Pressable, View } from "react-native";
import { ThemeText } from "@/components";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import { Modal } from 'react-native';

import Animated, {
  Easing,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { useAppTheme } from "@/lib/theme";
import { useEffect, useState } from "react";
import WaterModal from "@/components/home 2/WaterModal";

export default function Water() {
  const router = useRouter();
  const { language } = useLanguage();
  const { theme } = useAppTheme();
  const [componentHeight, setComponentHeight] = useState<number>(0);

  const animateHeight = useSharedValue<number>(0);
  const waterGoal = 3500;
  const [currentWater, setCurrentWater] = useState(100);

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    animateHeight.value = withTiming(Math.min(currentWater / waterGoal, 1), {
      duration: 300,
      easing: Easing.inOut(Easing.ease),
    });
  }, [currentWater, animateHeight, waterGoal]);

  const handlePressIn = () => {
    pressed.value = withTiming(1, { duration: 150 });
  };

  const handlePressOut = () => {
    pressed.value = withTiming(0, { duration: 150 });
  };

  const handlePress = () => {
    // router.push("/home/water");
    setModalVisible(true);
    // setCurrentWater((p) => Math.max(p + 500));
  };

  const pressed = useSharedValue<number>(0);
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

  // wave animation
  const [imgWidth] = useState<number>(1000);

  const wave1 = useSharedValue<number>(0);
  const wave2 = useSharedValue<number>(0);
  const wave3 = useSharedValue<number>(0);
  const wave4 = useSharedValue<number>(0);

  useEffect(() => {
    const config = { duration: 8000, easing: Easing.linear };
    wave1.value = withRepeat(withTiming(1, config), -1, true);
    wave2.value = withRepeat(
      withTiming(1, { ...config, duration: 9000 }),
      -1,
      true
    );
    wave3.value = withRepeat(
      withTiming(1, { ...config, duration: 10000 }),
      -1,
      true
    );
    wave4.value = withRepeat(
      withTiming(1, { ...config, duration: 11000 }),
      -1,
      true
    );
  }, [wave1, wave2, wave3, wave4]);

  // Wave styles: 1 & 2 move left, 3 & 4 move right
  const wave1Style = useAnimatedStyle(() => {
    const from = 0;
    const to = -imgWidth;
    const translateX = interpolate(wave1.value, [0, 1], [from, to]);
    const translateY = 30;
    return { transform: [{ translateX }, { translateY }] };
  });

  const wave2Style = useAnimatedStyle(() => {
    const from = 0;
    const to = -imgWidth;
    const translateX = interpolate(wave2.value, [0, 1], [from, to]);
    return { transform: [{ translateX }] };
  });

  const wave3Style = useAnimatedStyle(() => {
    const from = -imgWidth + 10;
    const to = 0;
    const translateX = interpolate(wave3.value, [0, 1], [from, to]);
    return { transform: [{ translateX }] };
  });

  const wave4Style = useAnimatedStyle(() => {
    const from = -imgWidth;
    const to = 0;
    const translateX = interpolate(wave4.value, [0, 1], [from, to]);
    return { transform: [{ translateX }] };
  });

  const animatedHeightStyle = useAnimatedStyle(() => {
    const top = interpolate(animateHeight.value, [0, 1], [80, 0]);
    return {
      top: `${top}%`,
    };
  });

  return (
    <Animated.View
      onLayout={(e) => {
        setComponentHeight(e.nativeEvent.layout.height);
      }}
      className="dark:bg-gray-90000 rounded-[26px] flex-[2] relative overflow-hidden dark:border-gray-800 border-[1px] border-gray-200"
      style={[animatedStyle, { flex: 2 }]}
    >
      <WaterModal visible={modalVisible} setVisible={setModalVisible}/>
      <Pressable
        className="flex-1 justify-between p-4 relative z-10"
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
      >
        <View className="flex-row items-center justify-between">
          <ThemeText className="flex-1 font-bold text-lg ">
            Water
            </ThemeText>
          <View className="w-[20px] h-[25px]">
            <Image
              source={require("@/assets/icons/waterDrop.svg")}
              style={{ width: "100%", height: "100%" }}
            />
          </View>
        </View>

        {/* Text content */}
        <View className="relative">
          <ThemeText className="text-2xl font-bold">3500</ThemeText>
          <ThemeText className="text-sm font-normal">17 oz </ThemeText>
        </View>
      </Pressable>

      {/* water animation */}
      <View className="absolute bottom-0 right-0 left-0 flex-1">
        <Animated.View
          style={[animatedHeightStyle, { height: componentHeight }]}
          className="flex-1"
        >
          <Animated.View
            style={[wave1Style]}
            className={
              "absolute top-0 left-0 z-0 flex-1 w-[1500px] h-full opacity-30"
            }
          >
            <Image
              source={require("@/assets/water/1.svg")}
              style={{ width: "100%", height: "100%" }}
            />
          </Animated.View>

          <Animated.View
            style={[wave2Style]}
            className={
              "absolute top-0 left-0 z-0 flex-1 w-[1500px] h-full opacity-30"
            }
          >
            <Image
              source={require("@/assets/water/2.svg")}
              style={{ width: "100%", height: "100%" }}
            />
          </Animated.View>

          <Animated.View
            style={[wave3Style]}
            className={
              "absolute top-0 left-0 z-0 flex-1 w-[1500px] h-full opacity-30"
            }
          >
            <Image
              source={require("@/assets/water/3.svg")}
              style={{ width: "100%", height: "100%" }}
            />
          </Animated.View>

          <Animated.View
            style={[wave4Style]}
            className={
              "absolute top-0 left-0 z-0 flex-1 w-[1500px] h-full opacity-30"
            }
          >
            <Image
              source={require("@/assets/water/4.svg")}
              style={{ width: "100%", height: "100%" }}
            />
          </Animated.View>
        </Animated.View>
      </View>
    </Animated.View>
  );
}
