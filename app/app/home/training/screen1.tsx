import { View, Text, ScrollView } from "react-native";
import { ThemeView } from "@/components";
import { Image, ImageBackground } from "expo-image";
import { languages, useLanguage } from "@/lib/language";
import { Share, Bookmark, X, Sun, Star } from "lucide-react-native";
import { Button } from "react-native-paper";
import { ThemeText } from "@/components";
import Animated, {
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
  interpolate,
} from "react-native-reanimated";
import { useAppTheme } from "@/lib/theme";

const IMAGE_HEIGHT = 320;
import { Switch } from "react-native";
import { useState } from "react";

function Screen1() {
  const { language } = useLanguage();
  const {theme} = useAppTheme(); // 'dark' or 'light'
  const isDark = theme === "dark";

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const deedHeight = 500;
  const [isEnabled, setIsEnabled] = useState(false);

  const deedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          scrollOffset.value,
          [0, deedHeight / 2, deedHeight],
          [0, -150, -200]
        ),
      },
    ],
  }));

  const deedContentStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollOffset.value, [0, deedHeight / 2], [1, 0]),
  }));

  const toggleSwitch = ()=>{}

  return (
    <ThemeView className="flex-1 relative pt-[100px]">
      <View className="flex-row items-center gap-3 absolute top-4 right-4 z-10">
        {[
          { icon: Share },
          { icon: Bookmark },
          { icon: X },
        ].map(({ icon: Icon }, i) => (
          <View
            key={i}
            className="p-4 rounded-2xl"
            style={{ backgroundColor: isDark ? "#333" : "#e5e5e5" }}
          >
            <Icon size={20} color={isDark ? "white" : "black"} />
          </View>
        ))}
      </View>

      <Animated.View
        style={[deedStyle, { height: IMAGE_HEIGHT }]}
        className="absolute top-0 left-0 right-0 w-full"
      >
        <ImageBackground
          source={require("@/assets/img/lightEffect.jpg")}
          style={{ width: "100%", height: "100%", padding: 12 }}
        >
          <Animated.View style={[deedContentStyle]} className="flex-1">
            <View className="flex-row items-center justify-between">
              <View className="p-2 bg-blue-700 rounded-full items-center">
                <Text className="text-white text-[11px] font-semibold p-1">
                  {languages[language].training.special}
                </Text>
              </View>
            </View>
            <ThemeText className="text-5xl font-bold text-white mt-9 font-quicksand">
              {languages[language].training.min}
            </ThemeText>
            <ThemeText className="text-2xl font-semibold text-white mt-1 font-quicksand">
              {languages[language].training.bul}
            </ThemeText>
            <View className="flex-row items-center mt-4 gap-3">
              <Sun size={15} color="white" />
              <ThemeText className="text-white font-quicksand">{languages[language].training.dund}</ThemeText>
            </View>
            <View className="flex-row items-center mt-4 gap-3">
              <Star size={15} color="white" />
              <ThemeText className="text-white font-quicksand">{languages[language].training.str}</ThemeText>
            </View>
          </Animated.View>
        </ImageBackground>
      </Animated.View>

      <ScrollView ref={scrollRef} style={{ paddingTop: IMAGE_HEIGHT - 100 }}>
        <Animated.View
          className="rounded-3xl z-10 p-6"
          style={{
            backgroundColor: isDark ? "#111827" : "white",
            minHeight: 1200,
          }}
        >
          <View className="flex-row items-center gap-4">
            <Image
              source={require("@/assets/img/duel1.png")}
              style={{ width: 53, height: 50 }}
            />
            <View>
              <ThemeText className="text-gray-500 font-quicksand ">{languages[language].training.vid}</ThemeText>
              <ThemeText className="font-semibold text-lg">Mnkv</ThemeText>
            </View>
          </View>

          <ThemeText className="mt-10 text-sm" style={{ color: isDark ? "#9ca3af" : "#6b7280" }}>
            {languages[language].training.hog}
          </ThemeText>

          <View
            className="flex-row items-center py-4 justify-between mt-4 border-b"
            style={{ borderColor: isDark ? "#374151" : "#d1d5db" }}
          >
            <ThemeText className="font-bold text-lg font-quicksand">{languages[language].training.aud}</ThemeText>
            <ThemeText className="font-bold text-lg font-quicksand">{languages[language].training.hugjim}</ThemeText>
          </View>

          <View className="flex-row items-center mt-14 gap-3">
            <Image
              source={require("@/assets/img/duel2.png")}
              style={{ width: 43, height: 40 }}
            />
            <ThemeText className="uppercase text-sm font-bold font-quicksand">
              {languages[language].training.dasgal}
            </ThemeText>
          </View>

          <ThemeText
            className="mt-4 font-quicksand"
            style={{ color: isDark ? "#9ca3af" : "#6b7280" }}
          >
            {languages[language].training.gejuu}
          </ThemeText>

          <ThemeText
            className="uppercase mt-14"
            style={{ color: isDark ? "#9ca3af" : "#6b7280" }}
          >
           {languages[language].training.need}
          </ThemeText>

          <View className="flex-row mt-4 gap-4 font-quicksand">
            {["Dumbbells", "Crossover Cable Machine"].map((item, i) => (
              <View
                key={i}
                className="py-8 px-4 rounded-2xl"
                style={{ backgroundColor: isDark ? "#374151" : "#e5e5e5" }}
              >
                <ThemeText className="font-semibold">{item}</ThemeText>
              </View>
            ))}
          </View>

          <ThemeText
            className="uppercase mt-14 font-quicksand"
            style={{ color: isDark ? "#9ca3af" : "#6b7280" }}
          >
            {languages[language].training.hiih}
          </ThemeText>

          {[
            { title: "Warm-Up", time: "+3min" },
            { title: "Cooldown", time: "+5min" },
          ].map(({ title, time }, i) => (
            <View
              key={i}
              className="flex-row items-center justify-between mt-4 border-b"
              style={{ borderColor: isDark ? "#374151" : "#d1d5db" }}
            >
              <View className="flex-row items-center gap-1 py-4">
                <ThemeText className="text-2xl font-bold">{title}</ThemeText>
                <ThemeText className="text-xl text-purple-400">
                  ({time})
                </ThemeText>
              </View>
              <Switch
                value={isEnabled}
                onValueChange={toggleSwitch}
                thumbColor={isEnabled ? "#2563EB" : "#ccc"}
                trackColor={{ false: "#ccc", true: "#93c5fd" }}
              />
            </View>
          ))}
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
            onPress={() => console.log("Adapt Workout")}
            className="rounded-xl"
            contentStyle={{
              paddingVertical: 12,
              backgroundColor: isDark ? "#6b7280" : "gray",
            }}
            labelStyle={{ color: "white" }}
          >
             {languages[language].training.adapt}
          </Button>
        </View>
      </View>
    </ThemeView>
  );
}

export default Screen1;

