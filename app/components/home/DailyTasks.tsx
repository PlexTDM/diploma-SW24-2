import React, { useState, useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import { CheckCircle2, Circle } from "lucide-react-native";
import { useTranslation } from "@/lib/language";
import { ThemeText } from "@/components";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";
import { useAppTheme } from "@/lib/theme";
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: true, // Reanimated runs in strict mode by default
});

type Task = {
  id: number;
  title: string;
  target: string;
  current: number;
  max: number;
  completed: boolean;
  icon: string;
  unit: string;
};

export default function DailyTasks() {
  const { t, i18n } = useTranslation();
  const [tasks, setTasks] = useState<Task[]>([]);
  const { theme } = useAppTheme();

  useEffect(() => {
    const getInitialTasks = (): Task[] => [
      {
        id: 1,
        title: t("dailyTasks.water.title"),
        target: t("dailyTasks.water.target", { count: 3 }),
        current: 2,
        max: 3,
        completed: false,
        icon: "💧",
        unit: t("dailyTasks.water.unit", { count: 3 }),
      },
      {
        id: 2,
        title: t("dailyTasks.walk.title"),
        target: t("dailyTasks.walk.target", { count: 1000 }),
        current: 750,
        max: 1000,
        completed: false,
        icon: "👣",
        unit: t("dailyTasks.walk.unit", { count: 1000 }),
      },
      {
        id: 3,
        title: t("dailyTasks.logMeal.title"),
        target: t("dailyTasks.logMeal.target", { count: 3 }),
        current: 1,
        max: 3,
        completed: false,
        icon: "🍽️",
        unit: t("dailyTasks.logMeal.unit", { count: 3 }),
      },
      {
        id: 4,
        title: t("dailyTasks.workout.title"),
        target: t("dailyTasks.workout.target", { count: 20 }),
        current: 20,
        max: 20,
        completed: true,
        icon: "💪",
        unit: t("dailyTasks.workout.unit", { count: 20 }),
      },
      {
        id: 5,
        title: t("dailyTasks.sleep.title"),
        target: t("dailyTasks.sleep.target", { count: 7 }),
        current: 6,
        max: 7,
        completed: false,
        icon: "😴",
        unit: t("dailyTasks.sleep.unit", { count: 7 }),
      },
      {
        id: 6,
        title: t("dailyTasks.stretch.title"),
        target: t("dailyTasks.stretch.target", { count: 5 }),
        current: 0,
        max: 5,
        completed: false,
        icon: "🧘",
        unit: t("dailyTasks.stretch.unit", { count: 5 }),
      },
      {
        id: 7,
        title: t("dailyTasks.meditate.title"),
        target: t("dailyTasks.meditate.target", { count: 5 }),
        current: 3,
        max: 5,
        completed: false,
        icon: "🧠",
        unit: t("dailyTasks.meditate.unit", { count: 5 }),
      },
    ];
    setTasks(getInitialTasks());
  }, [t, i18n.language]);

  const incrementProgress = (id: number) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === id) {
          const newCurrent = task.current < task.max ? task.current + 1 : 0;
          const newCompleted = newCurrent >= task.max;
          return { ...task, current: newCurrent, completed: newCompleted };
        }
        return task;
      })
    );
  };

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <View className="px-1 mt-6 pb-40">
      <View className="flex-row justify-between mb-4 items-center">
        <ThemeText className="text-xl font-bold  dark:text-white ">
          {t("home.task")}
        </ThemeText>
        <Text className="text-sm text-gray-500 dark:text-gray-400 ">
          {t("dailyTasks.completedFraction", {
            completedCount,
            totalTasks: tasks.length,
          })}
        </Text>
      </View>

      <View className="space-y-3 gap-3">
        {tasks.map((task) => {
          const containerClasses = `
  p-4 rounded-3xl flex-col border-1
  ${
    task.completed
      ? "border-blue-400 border border-l-[3px] border-gray-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-800/20"
      : "border-gray-200 border border-l-[3px] dark:border-zinc-700 bg-white dark:bg-zinc-600/20"
  }
`;

          return (
            <Pressable
              key={task.id}
              onPress={() => incrementProgress(task.id)}
              className={containerClasses}
            >
              <View className="flex-row items-center justify-between">
                <View>
                  <View className="flex-row items-center space-x-2 mb-1 gap-2">
                    <Text className="text-sm font-semibold text-black dark:text-white">
                      {task.title}
                    </Text>
                    <Text className="text-xl">{task.icon}</Text>
                  </View>
                  <Text className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                    {task.target}
                  </Text>

                  <View className="h-1.5 bg-gray-200 dark:bg-zinc-600 rounded-full mb-2 w-full">
                    <View
                      className={`h-full rounded-full ${
                        task.completed
                          ? "bg-blue-500"
                          : "bg-cyan-200 dark:bg-cyan-300"
                      }`}
                      style={{ width: `${(task.current / task.max) * 100}%` }}
                    />
                  </View>

                  <Text className="text-xs text-gray-500 dark:text-gray-400">
                    {task.current}/{task.max} {task.unit}
                  </Text>
                </View>

                <View className="items-center justify-center">
                  {task.completed ? (
                    <View className="rounded-full p-1 bg-blue-100 dark:bg-blue-600/40">
                      <CheckCircle2
                        size={18}
                        color={theme === "dark" ? "#5FBFFF" : "#136CF1"}
                      />
                    </View>
                  ) : (
                    <Circle size={18} color="#d1d5db" />
                  )}
                </View>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
