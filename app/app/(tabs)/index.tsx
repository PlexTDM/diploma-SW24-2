import { Sleep, Water, Training, Steps, Calories } from "@/components/home";
import Flame from "@/components/icons/Flame";
import { Pressable, View, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import FortuneCookie from "@/components/home/FortuneCookie";
import DailyTasks from "@/components/home/DailyTasks";
import FloatingButton from "@/components/chat/FloatingButton";
import React from "react";
export default function HomeTab() {
  const router = useRouter();

  return (
    <>
      <ScrollView className="p-8 dark:bg-gray-900 bg-white flex-1">
        <View className="w-full flex-row items-center justify-between  gap-2 pb-4">
          <View className="flex-row justify-end w-full items-center gap-2">
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

      <FloatingButton />
    </>
  );
}
