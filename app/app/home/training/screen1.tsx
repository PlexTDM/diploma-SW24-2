import { useState } from "react";
import { View, Text, ScrollView, Switch } from "react-native";
import { ThemeView, ThemeText } from "@/components";
import { Image, ImageBackground } from "expo-image";
import { languages, useLanguage } from "@/lib/language";
import { Share, Bookmark, X, Sun, Star } from "lucide-react-native";
import { Button } from "react-native-paper";
import Animated, {
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
  interpolate,
} from "react-native-reanimated";
const IMAGE_HEIGHT = 320;

function Screen1() {
  const { language } = useLanguage();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const deedHeight = 500;
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled((previous) => !previous);
  const deedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [0, deedHeight / 2, deedHeight],
            [0, -150, -200]
          ),
        },
      ],
    };
  });

  const deedContentStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, deedHeight / 2], [1, 0]),
    };
  });

  return (
    <ThemeView className="flex-1 relative pt-[100px]">
      <View className="flex-row items-center gap-3 absolute top-4 right-4 z-10">
        <View className="p-4 bg-gray-200 rounded-2xl">
          <Share size={20} color="black" />
        </View>
        <View className="p-4 bg-gray-200 rounded-2xl">
          <Bookmark size={20} color="black" />
        </View>
        <View className="p-4 bg-gray-200 rounded-2xl">
          <X size={20} color="black" />
        </View>
      </View>
      <Animated.View
        style={[deedStyle, { height: IMAGE_HEIGHT }]}
        className="absolute top-0 left-0 right-0 w-full"
      >
        <ImageBackground
          source={require("@/assets/img/lightEffect.jpg")}
          style={{ width: "100%", height: "100%", padding: 12 }}
          // resizeMode={"cover"}
        >
          {/* <Animated.Image            source={require("@/assets/img/lightEffect.jpg")}
            style={[ {width: "100%", height: "100%" }]}
            resizeMode={"cover"}
          /> */}
          <Animated.View style={[deedContentStyle]} className="flex-1">
            <View className="flex-row items-center justify-between">
              <View className="p-2 bg-blue-700 rounded-full items-center">
                <Text className="text-white text-[11px] font-semibold p-1">
                  {languages[language].training.special}
                </Text>
              </View>
            </View>
            <ThemeText className="text-5xl font-bold text-white mt-9">
              74 min
            </ThemeText>
            <ThemeText className="text-2xl font-semibold text-white mt-1">
              Back, Hamstrrings, Chest
            </ThemeText>
            <View className="flex-row items-center mt-4 gap-3">
              <Sun size={15} color="white" />
              <ThemeText className="text-white">Medium intensity</ThemeText>
            </View>
            <View className="flex-row items-center mt-4 gap-3">
              <Star size={15} color="white" />
              <ThemeText className="text-white">Stenrgth</ThemeText>
            </View>
          </Animated.View>
        </ImageBackground>
      </Animated.View>
      <ScrollView ref={scrollRef} style={{ paddingTop: IMAGE_HEIGHT - 100 }}>
        <Animated.View className="h-[1200px] bg-white rounded-3xl z-10 p-6">
          <View className="flex-row items-center gap-4">
            <Image
              source={require("@/assets/img/duel1.png")}
              style={{ width: 53, height: 50 }}
            />
            <View className="">
              <ThemeText className="text-gray-500 ">Video Coach</ThemeText>
              <ThemeText className="font-semibold text-lg">Mnkv</ThemeText>
            </View>
          </View>
          <ThemeText className="text-gray-500 mt-10 text-sm">
            MUSIC & VOICE
          </ThemeText>
          <View className="flex-row items-center py-4 justify-between mt-4 border-b border-gray-300">
            <ThemeText className="font-bold text-lg ">Audio Settings</ThemeText>
            <ThemeText className="font-bold text-lg ">Connect Music</ThemeText>
          </View>
          <View className="flex-row items-center mt-14 gap-3">
            <Image
              source={require("@/assets/img/duel2.png")}
              style={{ width: 43, height: 40 }}
            />
            <ThemeText className="uppercase text-sm font-bold">
              why this workout?
            </ThemeText>
          </View>
          <ThemeText className="text-gray-500 mt-4">
            Upper body, lower body, and core working together in today&apos;s
            gym session-build serious strength and muscle mass. Each set gets
            you closer to your muscle gain goal.
          </ThemeText>
          <ThemeText className="uppercase text-gray-500 mt-14">
            what you&apos;ll need
          </ThemeText>
          <View className="flex-row mt-4 gap-4">
            <View className="py-8 px-4 bg-gray-200 rounded-2xl">
              <ThemeText className="font-semibold">Dumbbells</ThemeText>
            </View>
            <View className="py-8 px-4 bg-gray-200 rounded-2xl">
              <ThemeText className="font-semibold">
                Crossover Cable Machine
              </ThemeText>
            </View>
          </View>
          <ThemeText className="uppercase text-gray-500 mt-14">
            what you&apos;ll do
          </ThemeText>
          <View className="flex-row items-center justify-between mt-4 border-b border-gray-300">
            <View className="flex-row items-center gap-1 py-4">
              <ThemeText className="text-2xl font-bold ">Warm-Up</ThemeText>
              <ThemeText className="text-xl text-purple-400">(+3min)</ThemeText>
            </View>
            <Switch
              value={isEnabled}
              onValueChange={toggleSwitch}
              thumbColor={isEnabled ? "#2563EB" : "#ccc"}
              trackColor={{ false: "#ccc", true: "#93c5fd" }}
            />
          </View>
          <View className="flex-row items-center justify-between mt-4 border-b border-gray-300">
            <View className="flex-row items-center gap-1 py-4">
              <ThemeText className="text-2xl font-bold ">Cooldown</ThemeText>
              <ThemeText className="text-xl text-purple-400">(+5min)</ThemeText>
            </View>
            <Switch
              value={isEnabled}
              onValueChange={toggleSwitch}
              thumbColor={isEnabled ? "#2563EB" : "#ccc"}
              trackColor={{ false: "#ccc", true: "#93c5fd" }}
            />
          </View>
        </Animated.View>
      </ScrollView>
      <View className="absolute bottom-5 left-5 right-5">
        <Button
          mode="contained"
          onPress={() => console.log("Create New Session")}
          className="rounded-xl"
          contentStyle={{ paddingVertical: 12, backgroundColor: "black" }}
        >
          Start Workout
        </Button>
        <View className="absolute bottom-20 left-5 right-5">
          <Button
            mode="contained"
            onPress={() => console.log("Create New Session")}
            className="rounded-xl"
            contentStyle={{
              paddingVertical: 12,
              backgroundColor: "gray",
              width: "100%",
            }}
          >
            Adapt Workout
          </Button>
        </View>
      </View>
    </ThemeView>
  );
}

export default Screen1;
