import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { CheckCircle2, Circle } from "lucide-react-native";

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
        <View className="px-4 mt-6">
            <View className="flex-row justify-between mb-4">
                <Text className="text-xl font-bold">Today's Tasks</Text>
                <Text className="text-sm text-gray-500">
                    {completedCount}/{tasks.length} completed
                </Text>
            </View>

            <View className="space-y-3">
                {tasks.map((task) => (
                    <TouchableOpacity
                        key={task.id}
                        onPress={() => incrementProgress(task.id)}
                        className={`
              w-full p-4 rounded-xl relative
              ${task.completed ? "bg-green-50 border-l-4 border-green-500" : "bg-white border border-gray-200"}
            `}
                    >
                        <View className="flex-row items-center justify-between">
                            <View>
                                <View className="flex-row items-center space-x-2 mb-1">
                                    <Text className="text-xl">{task.icon}</Text>
                                    <Text className="text-sm font-semibold">{task.title}</Text>
                                </View>
                                <Text className="text-xs text-gray-500 mb-2">{task.target}</Text>

                                <View className="h-1.5 bg-gray-200 rounded-full mb-2 w-full">
                                    <View
                                        className={`h-full rounded-full ${task.completed ? "bg-green-500" : "bg-blue-400"
                                            }`}
                                        style={{ width: `${(task.current / task.max) * 100}%` }}
                                    />
                                </View>

                                <Text className="text-xs text-gray-500">
                                    {task.current}/{task.max} {task.unit}
                                </Text>
                            </View>

                            <View className="items-center justify-center">
                                {task.completed ? (
                                    <View className="rounded-full bg-green-100 p-1">
                                        <CheckCircle2 size={18} color="#22c55e" />
                                    </View>
                                ) : (
                                    <Circle size={18} color="#d1d5db" />
                                )}
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}
