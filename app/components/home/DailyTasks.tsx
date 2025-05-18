import React, { useState } from "react";
import { View, Text, TouchableOpacity, Pressable } from "react-native";
import { CheckCircle2, Circle } from "lucide-react-native";
import { useColorScheme } from "react-native";
import { useLanguage, languages } from "@/lib/language";
import { ThemeText } from "@/components";
import {
    configureReanimatedLogger,
    ReanimatedLogLevel,
} from 'react-native-reanimated';
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


const initialTasks: Task[] = [
    { id: 1, title: "Drink water", target: "3 glasses", current: 2, max: 3, completed: false, icon: "💧", unit: "glasses" },
    { id: 2, title: "Walk", target: "1000 steps", current: 750, max: 1000, completed: false, icon: "👣", unit: "steps" },
    { id: 3, title: "Log meal", target: "3 meals", current: 1, max: 3, completed: false, icon: "🍽️", unit: "meals" },
    { id: 4, title: "Workout", target: "20 minutes", current: 20, max: 20, completed: true, icon: "💪", unit: "min" },
    { id: 5, title: "Sleep", target: "7 hours", current: 6, max: 7, completed: false, icon: "😴", unit: "hrs" },
    { id: 6, title: "Stretch", target: "5 minutes", current: 0, max: 5, completed: false, icon: "🧘", unit: "min" },
    { id: 7, title: "Meditate", target: "5 minutes", current: 3, max: 5, completed: false, icon: "🧠", unit: "min" },
];

export default function DailyTasks() {
    const [tasks, setTasks] = useState(initialTasks);
    const theme = useColorScheme();

    const { language } = useLanguage();
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
        <View className="px-1 mt-6">
            <View className="flex-row justify-between mb-4 items-center">
                <ThemeText className="text-xl font-bold  dark:text-white "> 
                    {languages[language].home.task}
                    </ThemeText>
                <Text className="text-sm text-gray-500 dark:text-gray-400 ">
                    {completedCount}/{tasks.length} completed
                </Text>
            </View>

            <View className="space-y-3 gap-3">
                {tasks.map((task) => {
                    const containerClasses = `
  p-4 rounded-3xl flex-col border-1
  ${task.completed
                            ? "border-blue-400 border border-l-[3px] border-gray-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-800/20"
                            : "border-gray-200 border border-l-[3px] dark:border-zinc-700 bg-white dark:bg-zinc-600/20"}
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
                                        <Text className="text-sm font-semibold text-black dark:text-white">{task.title}</Text>
                                        <Text className="text-xl">{task.icon}</Text>

                                    </View>
                                    <Text className="text-xs text-gray-500 dark:text-gray-400 mb-2">{task.target}</Text>

                                    <View className="h-1.5 bg-gray-200 dark:bg-zinc-600 rounded-full mb-2 w-full">
                                        <View
                                            className={`h-full rounded-full ${task.completed ? "bg-blue-500" : "bg-cyan-200 dark:bg-cyan-300"}`}
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
