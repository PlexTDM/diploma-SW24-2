import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Pressable,
  useColorScheme,
  ScrollView
} from "react-native";
import moment, { Moment } from "moment";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ThemeView , ThemeText} from "@/components";
import { Image } from "react-native";
const screenWidth = Dimensions.get("window").width;

const Blog = () => {
  const [dates, setDates] = useState<Moment[]>([]);
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const router = useRouter();
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

  return (
    <ScrollView>
    <ThemeView className="flex-1">
    <View className="p-6 items-center">
      <View className="flex-row justify-between items-center gap-80">
        <ThemeText className="font-bold text-2xl">Calories</ThemeText>
        <Feather name="bell" size={20} color="black" />
      </View>

      {/* Calendar */}
      <View style={styles.container}>
        {dates.map((date) => {
          const isSelected = selectedDate === date.format("YYYY-MM-DD");
          return (
            <TouchableOpacity
              key={date.format("YYYY-MM-DD")}
              onPress={() => handleSelectDate(date)}
              style={styles.dayContainer}
              activeOpacity={0.7}
            >
              <Text style={[styles.dayText, isDark && { color: "#ccc" }]}>
                {date.format("dd").charAt(0)}
              </Text>
              <Text
                style={[
                  styles.dateText,
                  isSelected && styles.selectedDate,
                  isDark && !isSelected && { color: "#fff" },
                ]}
              >
                {date.format("D")}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Nutrient Bars */}
      <View className="flex-row justify-between gap-7 mt-6">
        {[
          { label: "Cal", height: "h-36", color: "bg-blue-300", value: "1240" },
          {
            label: "Prot",
            height: "h-28",
            color: "bg-green-200",
            value: "60.2",
          },
          {
            label: "Carb",
            height: "h-40",
            color: "bg-green-300",
            value: "80.2",
          },
          {
            label: "Fats",
            height: "h-36",
            color: "bg-green-300",
            value: "68.2",
          },
          {
            label: "RDC",
            height: "h-24",
            color: "bg-orange-200",
            value: "12%",
          },
        ].map((item, i) => (
          <View className="flex-col gap-6 justify-center" key={i}>
            <View className="w-14 h-48 border rounded-full  border-gray-300 pt-8 justify-end">
              <View
                className={`w-15 ${item.height} ${item.color} rounded-full items-center `}
              >
                <View className="top-2 flex bg-white w-10 h-10 rounded-full items-center justify-center">
                  <Text className="text-[10px]">{item.value}</Text>
                </View>
              </View>
            </View>
            <Text className="justify-center text-center text-gray-500">
              {item.label}
            </Text>
          </View>
        ))}
      </View>

      {/* AI Suggestion Box */}
        <View className="w-full h-[200px] mt-6 relative rounded-3xl overflow-hidden ">
          <Image
            source={require("@/assets/img/foodPoster.png")}
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
          />

          {/* Overlay */}
          <View className="absolute  p-2 justify-center items-center top-6 left-5">
            <Text className="text-white text-2xl font-bold text-center mb-4 w-44">
              Not sure what to eat? Let AI decide for you
            </Text>
            <TouchableOpacity
              className="bg-white px-6 py-2 rounded-full items-center justify-center"
              onPress={() => router.push("/mnkv")}
            >
              <Text className="text-black font-semibold w-28 p-1 items-center justify-center">Take Quiz</Text>
            </TouchableOpacity>
          </View>
        </View>


      {/* Meals Section */}
      <Text
        className={`text-2xl font-bold mt-6 w-full px-2  ${
          isDark ? "text-white" : "text-black"
        }`}
      >
        Meals
      </Text>
          <View className="w-full h-28 border relative border-gray-300 rounded-3xl mt-6 flex-row items-center px-4">
            {/* Food image */}
            <View className="w-20 h-20 rounded-full overflow-hidden">
              <Image
                source={require("@/assets/food/breakfast.png")}
                style={{ width: "100%", height: "100%" }}
                resizeMode="cover"
              />
            </View>

            {/* Text info */}
            <View className="flex-1 ml-4">
              <Text
                className={`font-bold text-xl ${isDark ? "text-white" : "text-black"}`}
              >
                Breakfast
              </Text>
              <Text className="text-gray-500">120 / 304 cal</Text>
            </View>

            {/* Add button */}
            <Pressable
              onPress={() => router.push("/(meal)/nemeh")}
              className="w-12 h-12 rounded-full bg-[#CBE4FC]/40 dark:bg-[#CBE4FC]/20  justify-center items-center"
            >
              <Feather name="plus" size={24} color="#136CF1" />
            </Pressable>
          </View>
          <View className="w-full h-28 border relative border-gray-300 rounded-3xl mt-6 flex-row items-center px-4">
            {/* Food image */}
            <View className="w-20 h-20 rounded-full overflow-hidden">
              <Image
                source={require("@/assets/food/lunch.png")}
                style={{ width: "100%", height: "100%" }}
                resizeMode="cover"
              />
            </View>

            {/* Text info */}
            <View className="flex-1 ml-4">
              <Text
                className={`font-bold text-xl ${isDark ? "text-white" : "text-black"}`}
              >
                Breakfast
              </Text>
              <Text className="text-gray-500">120 / 304 cal</Text>
            </View>

            {/* Add button */}
            <Pressable
              onPress={() => router.push("/(meal)/nemeh")}
              className="w-12 h-12 rounded-full bg-[#CBE4FC]/40 dark:bg-[#CBE4FC]/20  justify-center items-center"
            >
              <Feather name="plus" size={24} color="#136CF1" />
            </Pressable>
          </View>
          <View className="w-full h-28 border relative border-gray-300 rounded-3xl mt-6 flex-row items-center px-4">
            {/* Food image */}
            <View className="w-20 h-20 rounded-full overflow-hidden">
              <Image
                source={require("@/assets/food/dinner.png")}
                style={{ width: "100%", height: "100%" }}
                resizeMode="cover"
              />
            </View>

            {/* Text info */}
            <View className="flex-1 ml-4">
              <Text
                className={`font-bold text-xl ${isDark ? "text-white" : "text-black"}`}
              >
                Breakfast
              </Text>
              <Text className="text-gray-500">120 / 304 cal</Text>
            </View>

            {/* Add button */}
            <Pressable
              onPress={() => router.push("/(meal)/nemeh")}
              className="w-12 h-12 rounded-full bg-[#CBE4FC]/40 dark:bg-[#CBE4FC]/20 justify-center items-center"
            >
              <Feather name="plus" size={24} color="#136CF1" />
            </Pressable>
          </View>
          <View className="w-full h-28 border relative border-gray-300 rounded-3xl mt-6 flex-row items-center px-4">
            {/* Food image */}
            <View className="w-20 h-20 rounded-full overflow-hidden">
              <Image
                source={require("@/assets/food/donut.png")}
                style={{ width: "100%", height: "100%" }}
                resizeMode="cover"
              />
            </View>

            {/* Text info */}
            <View className="flex-1 ml-4">
              <Text
                className={`font-bold text-xl ${isDark ? "text-white" : "text-black"}`}
              >
                Breakfast
              </Text>
              <Text className="text-gray-500">120 / 304 cal</Text>
            </View>

            {/* Add button */}
            <Pressable
              onPress={() => router.push("/(meal)/nemeh")}
              className="w-12 h-12 rounded-full bg-[#CBE4FC]/40 dark:bg-[#CBE4FC]/20  justify-center items-center"
            >
              <Feather name="plus" size={24} color="#136CF1" />
            </Pressable>
          </View>

      
    </View>
    </ThemeView>
    </ScrollView>
  );
};

export default Blog;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 20,
  },
  dayContainer: {
    alignItems: "center",
    width: (screenWidth - 20) / 7,
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
