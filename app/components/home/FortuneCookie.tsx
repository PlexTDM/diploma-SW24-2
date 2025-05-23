import { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Cookie } from "lucide-react-native";
import { useAppTheme } from "@/lib/theme";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  Easing,
  withSequence,
} from "react-native-reanimated";

export default function FortuneCookie() {
  const { theme } = useAppTheme();
  const iconColor = theme === "dark" ? "#fcd34d" : "#92400e";

  const [cracked, setCracked] = useState(false);
  const [quote, setQuote] = useState("");

  const leftAnim = useSharedValue(0);
  const rightAnim = useSharedValue(0);
  const shakeAnim = useSharedValue(0);
  const fortuneOpacity = useSharedValue(0);
  const fortuneTranslate = useSharedValue(20);
  const containerHeight = useSharedValue(50);

  const quotes = [
    "Your potential is limitless. 🚀",
    "Small steps every day. 🐾",
    "Fitness is a journey, not a destination. 🛤️",
    "You're stronger than you think! 💪",
    "Progress, not perfection. 🌱",
    "Keep going—every rep counts! 🔁",
    "Believe in the power of consistency. ⏳",
    "One day or day one. You decide. 🎯",
    "Success starts with showing up. 🏁",
    "The only bad workout is the one you didn't do. 🏋️",
    "Push past your limits—growth lives there. 🌄",
    "Discipline beats motivation. 💥",
    "Fuel your body, free your mind. 🍎🧘",
    "You're not alone—your future self is cheering. 🎉",
    "Show up for yourself today. You deserve it. 💖",
  ];

  const getRandomQuote = () => {
    const index = Math.floor(Math.random() * quotes.length);
    return quotes[index];
  };
  const leftStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: leftAnim.value * -100 },
      { rotate: `${leftAnim.value * -45}deg` },
    ],
    opacity: 1 - leftAnim.value,
  }));

  const rightStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: rightAnim.value * 100 },
      { rotate: `${rightAnim.value * 45}deg` },
    ],
    opacity: 1 - rightAnim.value,
  }));

  const shakeStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${shakeAnim.value * 5}deg`,
      },
    ],
  }));

  const fortuneStyle = useAnimatedStyle(() => ({
    opacity: fortuneOpacity.value,
    transform: [{ translateY: fortuneTranslate.value }],
  }));

  const containerStyle = useAnimatedStyle(() => ({
    height: containerHeight.value,
  }));

  const animateCrack = () => {
    setCracked((p) => !p);
    setQuote(getRandomQuote());

    leftAnim.value = withTiming(1, {
      duration: 1000,
      easing: Easing.out(Easing.ease),
    });
    rightAnim.value = withTiming(1, {
      duration: 1000,
      easing: Easing.out(Easing.ease),
    });
    containerHeight.value = withTiming(100, {
      duration: 1000,
      easing: Easing.out(Easing.ease),
    });

    setTimeout(() => {
      fortuneOpacity.value = withTiming(1, {
        duration: 600,
        easing: Easing.out(Easing.ease),
      });
      fortuneTranslate.value = withTiming(0, {
        duration: 600,
        easing: Easing.out(Easing.ease),
      });
    }, 400);
  };

  useEffect(() => {
    if (!cracked) {
      shakeAnim.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 80 }),
          withTiming(-1, { duration: 100 }),
          withTiming(0, { duration: 80 })
        ),
        -1,
        true
      );
    }
    return () => {
      shakeAnim.value = 0;
    };
  }, [cracked, shakeAnim]);

  return (
    <Pressable
      onPress={!cracked ? animateCrack : undefined}
      className="rounded-2xl p-2 border border-amber-200 w-full dark:border-amber-800 bg-amber-50 dark:bg-amber-900/30 overflow-hidden"
    >
      <Animated.View style={containerStyle}>
        {!cracked ? (
          <View className="flex-1 flex-row items-center gap-4">
            <Animated.View
              className="bg-amber-300 dark:bg-amber-700 p-3 rounded-full"
              style={shakeStyle}
            >
              <Cookie size={24} color={iconColor} />
            </Animated.View>

            <View>
              <Text className="font-semibold text-amber-800 dark:text-amber-200 mb-1">
                Tap to crack your fortune!
              </Text>
              <Text className="text-amber-600 dark:text-amber-100">
                Reveal today’s wisdom 🍪
              </Text>
            </View>
          </View>
        ) : (
          <Animated.View style={[styles.crackedContainer]}>
            <Animated.View style={[styles.cookiePiece, styles.left, leftStyle]}>
              <Cookie size={24} color={iconColor} />
            </Animated.View>
            <Animated.View
              style={[styles.cookiePiece, styles.right, rightStyle]}
            >
              <Cookie size={24} color={iconColor} />
            </Animated.View>
            <Animated.View style={fortuneStyle}>
              <Text className="text-center text-amber-800 dark:text-amber-100 text-base font-medium">
                “{quote}”
              </Text>
            </Animated.View>
          </Animated.View>
        )}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  crackedContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  cookiePiece: {
    position: "absolute",
    top: 0,
  },
  left: {
    left: 30,
  },
  right: {
    right: 30,
  },
});
