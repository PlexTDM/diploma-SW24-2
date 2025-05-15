import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  Pressable,
  TouchableOpacity,
} from "react-native";
import moment, { Moment } from "moment";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { ThemeView, ThemeText } from "@/components";
import { languages, useLanguage } from "@/lib/language";
import {
  ArrowRight,
  BarChart,
  ChevronRight,
  Dumbbell,
  DumbbellIcon,
  Flag,
} from "lucide-react-native";
import { Image } from "expo-image";

export default function Training() {
  const [dates, setDates] = useState<Moment[]>([]);
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const router = useRouter();
  const { language } = useLanguage();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  useEffect(() => {
    const today = moment();
    const days = [];
    for (let i = 0; i < 7; i++) {
      days.push(today.clone().add(i, "days"));
    }
    setDates(days);
  }, []);

  const handleSelectDate = (date: Moment) => {
    setSelectedDate(date.format("YYYY-MM-DD"));
  };

  const handleArrow = () => {
    router.push("/home/training/screen1");
  };

  const handleMyWorkouts = () => {
    router.push("/home/training/screen2");
  };

  const handleCustomWorkout = () => {
    router.push("/home/training/screen3");
  };

  return (
    <ThemeView className="flex-1 relative">
      <View className="h-[65%] p-6">
        <Image
          source={require("@/assets/img/lightEffect.jpg")}
          style={[StyleSheet.absoluteFillObject, { zIndex: 0 }]}
          contentFit="fill"

        />
        <View
          style={[
            StyleSheet.absoluteFillObject,
            { backgroundColor: isDark ? "#00000000" : "#ffffff00" },
          ]}
        />

        {/* Main Content */}
        <View className="flex-1">
          {/* Calendar */}
          <View className="p-2">
            <View className="flex-row justify-between mt-8">
              {dates.map((date) => {
                const isSelected = selectedDate === date.format("YYYY-MM-DD");
                return (
                  <TouchableOpacity
                    key={date.format("YYYY-MM-DD")}
                    onPress={() => handleSelectDate(date)}
                    activeOpacity={0.7}
                    className={`items-center px-3 py-2 rounded-2xl ${isSelected ? " bg-gray-200/40" : "bg-none"
                      }`}
                  >
                    <Text className="text-xs text-slate-300">
                      {date.format("dd").charAt(0)}
                    </Text>
                    <Text className="text-white font-bold text-base">
                      {date.format("D")}
                    </Text>
                    {isSelected && (
                      <View className="flex flex-row mt-1">
                        <View className="w-1 h-1 bg-white rounded-full mx-0.5" />
                        <View className="w-1 h-1 bg-white rounded-full mx-0.5" />
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>


            <Text className="text-3xl text-start font-semibold mt-4 text-white">
              {languages[language].training.hi}, Galbadrakh!
            </Text>
            <Text className="text-lg text-start mt-2 text-gray-200 ">
              {languages[language].training.hello}
            </Text>

            {/* Highlight Workout Block */}
            <View className="w-full bg-blue-200/30 relative rounded-3xl mt-4 p-6">
              <View className="flex-row items-start gap-4">
                <View className="p-2 bg-blue-700 rounded-full items-center">
                  <Text className="text-white text-[11px] font-semibold p-1">
                    {languages[language].training.special}
                  </Text>
                </View>
                <View className="p-2 px-4 bg-gray-300/40 rounded-full items-center">
                  <Text className="text-white p-1 text-[11px] font-semibold">Gym</Text>
                </View>
              </View>

              <Text className="text-black font-bold text-4xl mt-8">
                75 min
              </Text>
              <Text className=" text-base text-black">
                 {languages[language].training.nerrr}
              </Text>

              <View className="flex-row mt-6 gap-2">
                <View className="w-16 h-16 rounded-2xl bg-white" />
                <View className="w-16 h-16 rounded-2xl bg-white" />
                <View className="w-16 h-16 rounded-2xl bg-white" />
                <View className="w-16 h-16 rounded-2xl bg-white" />
                <Pressable
                  className="w-16 h-16 rounded-2xl bg-white items-center justify-center"
                  onPress={handleArrow}
                >
                  <ArrowRight size={32} color="black" />
                </Pressable>
              </View>
            </View>


            {/* Custom Workouts Block */}
            <Pressable
              className="flex-row border rounded-3xl border-gray-400 w-full mt-10 p-4 items-center justify-between gap-4"
              onPress={handleMyWorkouts}
            >
              <View className="flex-row gap-4 items-center">
                <View className="w-16 h-16 bg-gray-200 rounded-3xl justify-center items-center">
                  <Feather name="sliders" size={20} color="black" />
                </View>
                <Text className="font-semibold text-lg text-white">
                  {languages[language].training.custom}
                </Text>
              </View>
              <ChevronRight size={20} color="white" />
            </Pressable>
          </View>
          {/* Gym Challenge */}
          <Pressable
            className="w-full bg-gray-200 rounded-3xl mt-16 p-8"
            onPress={handleCustomWorkout}
          >
            <View className="flex-row justify-between items-center">
              <View className="flex-row gap-2">
                <Dumbbell size={30} color="black" />
                <View>
                  <ThemeText className="text-sm font-bold">
                    {languages[language].training.get}
                  </ThemeText>
                  <ThemeText className="text-sm">
                    {languages[language].training.comp}
                  </ThemeText>
                </View>
              </View>
              <ChevronRight size={20} color="black" />
            </View>
            <View className="mt-6 flex-row items-center justify-between">
              <View className="w-10 h-10 rounded-full bg-gray-300 justify-center items-center">
                <DumbbellIcon size={15} color="black" />
              </View>
              <View className="w-10 h-10 rounded-full bg-gray-300 justify-center items-center">
                <DumbbellIcon size={15} color="black" />
              </View>
              <View className="w-10 h-10 rounded-full bg-gray-300 justify-center items-center">
                <Flag size={15} color="black" />
              </View>
            </View>
            <ThemeText className="mt-3">
              {languages[language].training.urid}
            </ThemeText>
          </Pressable>
        </View>
      </View>
    </ThemeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 20,
  },
  dayContainer: {
    alignItems: "center",
  },
  dayText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
  dateText: {
    fontSize: 14,
    color: "#000",
    paddingHorizontal: 4,
    paddingVertical: 4,
    borderRadius: 20,
  },
  selectedDate: {
    backgroundColor: "#3b82f6",
    color: "#fff",
    fontWeight: "bold",
  },
});
