import { ThemeView } from "@/components";
import { useState, useRef, useEffect, useMemo } from "react";
import { View, Text, ScrollView } from "react-native";
import { addMonths, subMonths } from "date-fns";
import MiniCalendar from "@/components/MiniCalendar";
import ConfettiCannon from "react-native-confetti-cannon";

export default function Streak() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const confettiRef = useRef<ConfettiCannon>(null);

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
    let longestStreak = 10;
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
  const achievements = useMemo(
    () => [
      { days: 7, label: "7-Day Streak" },
      { days: 14, label: "14-Day Streak" },
      { days: 30, label: "30-Day Streak" },
      { days: 60, label: "60-Day Streak" },
    ],
    []
  );

  useEffect(() => {
    const isNewRecord = currentStreak > 0 && currentStreak === longestStreak;
    const isAchievementMilestone = achievements.some(
      (ach) => ach.days === currentStreak
    );

    if (isNewRecord && isAchievementMilestone) {
      confettiRef.current?.start();
    }
  }, [currentStreak, longestStreak, achievements]);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <ThemeView className="flex-1 bg-white dark:bg-gray-900">
        <View className="w-full px-2 mb-2">
          <Text className="text-lg font-bold text-black dark:text-white mt-10 text-center">
            Streak Days
          </Text>
        </View>

        <View className="p-4 dark:bg-gray-900">
          <View className="flex-row justify-between mb-4">
            <View className="flex-1 bg-blue-100 p-3 rounded-xl mr-2">
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

          {/* Achievements */}
          <View className="mt-6">
            <Text className="text-lg font-semibold text-black dark:text-white mb-4 text-center">
              Streak Achievements
            </Text>
            <View className="flex-row flex-wrap justify-between gap-4">
              {achievements.map((achievement, index) => {
                const unlocked = longestStreak >= achievement.days;
                const progress = Math.min(longestStreak / achievement.days, 1);

                return (
                  <View
                    key={index}
                    className={`w-[48%] items-center p-4 rounded-xl ${
                      unlocked ? "bg-green-100" : "bg-gray-200 dark:bg-gray-700"
                    }`}
                  >
                    <View
                      className={`h-12 w-12 rounded-full mb-2 items-center justify-center ${
                        unlocked
                          ? "bg-green-200"
                          : "bg-gray-400 dark:bg-gray-600"
                      }`}
                    >
                      <Text className="text-xl">{unlocked ? "🏆" : "🔒"}</Text>
                    </View>

                    <Text
                      className={`text-sm font-medium ${
                        unlocked
                          ? "text-green-800"
                          : "text-gray-500 dark:text-gray-300"
                      }`}
                    >
                      {achievement.label}
                    </Text>

                    <Text
                      className={`text-xs mt-1 px-2 py-1 rounded-full ${
                        unlocked
                          ? "bg-green-300 text-green-900"
                          : "bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300"
                      }`}
                    >
                      {unlocked ? "Unlocked" : "Locked"}
                    </Text>

                    {!unlocked && (
                      <View className="w-full h-2 bg-gray-300 dark:bg-gray-600 rounded-full mt-2">
                        <View
                          className="h-full bg-green-400 rounded-full"
                          style={{ width: `${progress * 100}%` }}
                        />
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
            <ConfettiCannon
              count={50}
              origin={{ x: 200, y: -20 }}
              fadeOut
              explosionSpeed={300}
              fallSpeed={3000}
              ref={confettiRef}
              // set on for testing
              autoStart={false}
            />
          </View>
        </View>
      </ThemeView>
    </ScrollView>
  );
}
