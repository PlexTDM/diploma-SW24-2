import React, { useState, useEffect } from "react";
import { View, Text, useColorScheme, StyleSheet, Animated } from "react-native";
import { languages, useLanguage } from "@/lib/language";
import { useRouter } from "expo-router";

const Asuult5 = () => {
  const { language } = useLanguage();
  const question5 = languages[language].question5;

  const colorScheme = useColorScheme();
  const textColor = colorScheme === "dark" ? "#ffffff" : "#000000";
  const backgroundColor = colorScheme === "dark" ? "#1e1e1e" : "#ffffff";

  const router = useRouter();

  const [progress, setProgress] = useState(new Animated.Value(0));
  const [progressText, setProgressText] = useState("0%");

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 6000,
      useNativeDriver: false,
    }).start();

    const interval = setInterval(() => {
      setProgressText((prevText) => {
        const currentValue = parseInt(prevText);
        if (currentValue < 100) {
          return `${currentValue + 20}%`;
        }
        return "100%";
      });
    }, 1000);

    const timer = setTimeout(() => {
      router.push("/stats");
    }, 6000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <View style={[styles.wrapper, { backgroundColor }]}>
      {/* Text Section */}
      <View style={styles.textContainer}>
        <Text style={[styles.question, { color: textColor }]}>
          {question5.zori}
        </Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressWrapper}>
        <View style={styles.progressBarContainer}>
          <Animated.View
            style={[
              styles.progressBar,
              {
                width: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0%", "100%"],
                }),
              },
            ]}
          />
        </View>

        {/* Progress Percentage Text under the bar */}
        <Text style={[styles.progressText, { color: textColor }]}>
          {progressText}
        </Text>
      </View>
    </View>
  );
};

export default Asuult5;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "flex-end", // ← Доош төвлөрүүлэх
    alignItems: "center",
    padding: 20,
    paddingBottom: 160, // ← Доош арай зайтай болгох бол энэ нэмэлт тохиргоо
  },

  textContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  question: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  progressWrapper: {
    width: "100%",
    alignItems: "center",
  },
  progressBarContainer: {
    width: "100%",
    height: 8,
    backgroundColor: "#E6E6E6",
    borderRadius: 5,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#136CF1",
    borderRadius: 5,
  },
  progressText: {
    fontSize: 18,
    marginTop: 8,
  },
});
