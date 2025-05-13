import { ThemeView } from "@/components";
import { useState } from "react";
import { View, Text } from "react-native";
import { addMonths, subMonths } from "date-fns";
import MiniCalendar from "@/components/MiniCalendar";

export default function Streak() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [completedDays, setCompletedDays] = useState<number[]>([]);

  const today = new Date();

  const onToggleComplete = (day: number) => {
    setCompletedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const handleNextMonth = () => {
    const nextMonth = addMonths(currentDate, 1);
    if (
      nextMonth.getMonth() <= today.getMonth() &&
      nextMonth.getFullYear() <= today.getFullYear()
    ) {
      setCurrentDate(nextMonth);
    }
  };

  const isNextDisabled =
    currentDate.getMonth() === today.getMonth() &&
    currentDate.getFullYear() === today.getFullYear();

  const calculateStreaks = (completed: number[]) => {
    const sorted = [...completed].sort((a, b) => a - b);
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 1;

    for (let i = 1; i < sorted.length; i++) {
      if (sorted[i] === sorted[i - 1] + 1) {
        tempStreak++;
      } else {
        tempStreak = 1;
      }

      if (tempStreak > longestStreak) longestStreak = tempStreak;
    }

    const todayDate = today.getDate();
    const lastCompleted = sorted[sorted.length - 1];
    if (lastCompleted === todayDate || lastCompleted === todayDate - 1) {
      currentStreak = tempStreak;
    }

    return { currentStreak, longestStreak };
  };

  const { currentStreak, longestStreak } = calculateStreaks(completedDays);

  return (
    <ThemeView>
      <View className="w-full px-2 mb-2">
        <Text className="text-lg font-bold text-black dark:text-white mb-2 text-center">
          Streak Days
        </Text>
      </View>
      <View className="p-4 dark:bg-gray-900 ">
        <View className="flex-row justify-between mb-4 ">
          <View className="flex-1 bg-blue-100 p-3 rounded-xl mr-2 ">
            <Text className="text-md font-semibold text-blue-800">
              Current Streak
            </Text>
            <Text className="text-2xl font-bold text-blue-900">
              {currentStreak}
            </Text>
          </View>
          <View className="flex-1 bg-yellow-100 p-3 rounded-xl ml-2">
            <Text className="text-md font-semibold text-yellow-800">
              Longest Streak
            </Text>
            <Text className="text-2xl font-bold text-yellow-900">
              {longestStreak}
            </Text>
          </View>
        </View>

        <MiniCalendar
          currentDate={currentDate}
          completedDays={completedDays}
          onToggleComplete={onToggleComplete}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
          isNextDisabled={isNextDisabled}
        />
      </View>
    </ThemeView>
  );
}