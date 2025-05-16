import { useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    Pressable,
    Animated,
    Easing,
    StyleSheet,
} from "react-native";
import { Cookie } from "lucide-react-native";
import { useColorScheme } from "react-native";

export default function FortuneCookie() {
    const theme = useColorScheme();
    const iconColor = theme === "dark" ? "#fcd34d" : "#92400e";

    const [cracked, setCracked] = useState(false);
    const [quote, setQuote] = useState("");

  
    const leftAnim = useRef(new Animated.Value(0)).current;
    const rightAnim = useRef(new Animated.Value(0)).current;
    const fortuneOpacity = useRef(new Animated.Value(0)).current;
    const fortuneTranslate = useRef(new Animated.Value(20)).current;
    
    const quotes = [
        "Your potential is limitless. 🚀",
        "Small steps every day. 🐾",
        "Fitness is a journey, not a destination. 🛤️",
        "You're stronger than you think! 💪",
        "Progress, not perfection. 🌱",
        "Keep going—every rep counts! 🔁",
        "Believe in the power of consistency. ⏳",
        "One day or day one. You decide. 🎯",
        "Success starts with showing up. 🏁",
        "The only bad workout is the one you didn’t do. 🏋️",
        "Push past your limits—growth lives there. 🌄",
        "Discipline beats motivation. 💥",
        "Fuel your body, free your mind. 🍎🧘",
        "You’re not alone—your future self is cheering. 🎉",
        "Show up for yourself today. You deserve it. 💖",
    ];


    const getRandomQuote = () => {
        const index = Math.floor(Math.random() * quotes.length);
        return quotes[index];
    };
    const shakeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (!cracked) {
            const loop = Animated.loop(
                Animated.sequence([
                    Animated.timing(shakeAnim, {
                        toValue: 1,
                        duration: 80,
                        easing: Easing.linear,
                        useNativeDriver: true,
                    }),
                    Animated.timing(shakeAnim, {
                        toValue: -1,
                        duration: 100,
                        easing: Easing.linear,
                        useNativeDriver: true,
                    }),
                    Animated.timing(shakeAnim, {
                        toValue: 0,
                        duration: 80,
                        easing: Easing.linear,
                        useNativeDriver: true,
                    }),
                ])
            );
            loop.start();

            return () => {
                loop.stop();
                shakeAnim.setValue(0);
            };
        }
    }, [cracked]);


    const animateCrack = () => {
        setCracked(true);
        setQuote(getRandomQuote());

        Animated.parallel([
            Animated.timing(leftAnim, {
                toValue: 1,
                duration: 1000,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }),
            Animated.timing(rightAnim, {
                toValue: 1,
                duration: 1000,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }),
            Animated.sequence([
                Animated.delay(400),
                Animated.parallel([
                    Animated.timing(fortuneOpacity, {
                        toValue: 1,
                        duration: 600,
                        easing: Easing.out(Easing.ease),
                        useNativeDriver: true,
                    }),
                    Animated.timing(fortuneTranslate, {
                        toValue: 0,
                        duration: 600,
                        easing: Easing.out(Easing.ease),
                        useNativeDriver: true,
                    }),
                ]),
            ]),
        ]).start();
    };

    const leftStyle = {
        transform: [
            {
                translateX: leftAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -100],
                }),
            },
            {
                rotate: leftAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "-45deg"],
                }),
            },
        ],
        opacity: leftAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0],
        }),
    };

    const rightStyle = {
        transform: [
            {
                translateX: rightAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 100],
                }),
            },
            {
                rotate: rightAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "45deg"],
                }),
            },
        ],
        opacity: rightAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0],
        }),
    };

    const fortuneStyle = {
        opacity: fortuneOpacity,
        transform: [{ translateY: fortuneTranslate }],
    };

    return (
        <Pressable
            onPress={!cracked ? animateCrack : undefined}
            className="rounded-2xl p-2  border border-amber-200 w-full dark:border-amber-800 bg-amber-50 dark:bg-amber-900/30 overflow-hidden"
        >
            {!cracked ? (
                <View className="flex-row items-center gap-4">
                    <Animated.View
                        className="bg-amber-300 dark:bg-amber-700 p-3 rounded-full"
                        style={{
                            transform: [
                                {
                                    rotate: shakeAnim.interpolate({
                                        inputRange: [-1, 1],
                                        outputRange: ['-5deg', '5deg'],
                                    }),
                                },
                            ],
                        }}
                    >
                        <Cookie size={24} color={iconColor} />
                    </Animated.View>

                    <View>
                        <Text className="font-semibold text-amber-800 dark:text-amber-200 mb-1">
                            Tap to crack your fortune!
                        </Text>
                        <Text className="text-amber-600 dark:text-amber-100">
                            Reveal today’s wisdom 🍪
                        </Text>
                    </View>
                </View>
            ) : (
                <View style={styles.crackedContainer}>
                    <Animated.View style={[styles.cookiePiece, styles.left, leftStyle]}>
                        <Cookie size={24} color={iconColor} />
                    </Animated.View>
                    <Animated.View style={[styles.cookiePiece, styles.right, rightStyle]}>
                        <Cookie size={24} color={iconColor} />
                    </Animated.View>
                    <Animated.View style={[fortuneStyle]}>
                        <Text className="text-center text-amber-800 dark:text-amber-100 text-base font-medium">
                            "{quote}"
                        </Text>
                    </Animated.View>
                </View>
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    crackedContainer: {
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
        height: 100,
    },
    cookiePiece: {
        position: "absolute",
        top: 0,
    },
    left: {
        left: 30,
    },
    right: {
        right: 30,
    },
});
