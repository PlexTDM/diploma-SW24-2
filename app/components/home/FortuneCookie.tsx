import { useEffect, useState } from "react";
import { View, Text, Pressable, Animated, Easing } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Cookie } from "lucide-react-native";
import { useColorScheme } from "react-native";

const motivationalQuotes = [
    "The only bad workout is the one that didn't happen.",
    "Don't wish for it, work for it.",
    "Sweat is just fat crying.",
    "Strive for progress, not perfection.",
    "Your body can stand almost anything. It's your mind you have to convince.",
];

const STORAGE_KEY = "dailyMotivationQuote";
const EXPIRY_KEY = "dailyMotivationExpiry";

export default function FortuneCookie() {
    const [quote, setQuote] = useState<string | null>(null);
    const [opacity] = useState(new Animated.Value(1));
    const theme = useColorScheme();
    const iconColor = theme === "dark" ? "#fcd34d" : "#92400e";

    useEffect(() => {
        loadQuote();
    }, []);

    const loadQuote = async () => {
        const savedQuote = await AsyncStorage.getItem(STORAGE_KEY);
        const expiry = await AsyncStorage.getItem(EXPIRY_KEY);
        const now = Date.now();

        if (savedQuote && expiry && now < Number(expiry)) {
            setQuote(savedQuote);
        } else {
            const newQuote = getRandomQuote();
            setQuote(newQuote);
            const fiveMinutesLater = now + 5 * 60 * 1000;
            await AsyncStorage.setItem(STORAGE_KEY, newQuote);
            await AsyncStorage.setItem(EXPIRY_KEY, fiveMinutesLater.toString());

            setTimeout(() => {
                setQuote(null);
                AsyncStorage.removeItem(STORAGE_KEY);
                AsyncStorage.removeItem(EXPIRY_KEY);
            }, 5 * 60 * 1000);
        }
    };

    const getRandomQuote = () => {
        const index = Math.floor(Math.random() * motivationalQuotes.length);
        return motivationalQuotes[index];
    };

    if (!quote) return null;

    return (
        <View className="rounded-2xl p-3 overflow-hidden w-full border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/30 relative">
            <View className="flex-row items-start gap-4">
                <View className="bg-amber-300 dark:bg-amber-700 p-3 rounded-full">
                    <Cookie size={24} color={iconColor} />
                </View>
                <View>
                <Text className="font-semibold text-amber-800 dark:text-amber-200 mb-1">
                    Today's Motivation
                </Text>
                <Animated.View
                    style={{
                        opacity,
                        transform: [
                            {
                                translateY: opacity.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [-8, 0],
                                }),
                            },
                        ],
                    }}
                >
                    <Text className="text-amber-800 dark:text-amber-100">
                        "{quote}"
                    </Text>
                </Animated.View>
                </View>
            </View>
        </View>
    );
}
