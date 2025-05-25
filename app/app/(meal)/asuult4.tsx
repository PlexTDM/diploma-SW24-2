import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  useColorScheme,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { languages, useLanguage } from "@/lib/language";
import moment, { Moment } from "moment";
import LottieView from "lottie-react-native";
const screenWidth = Dimensions.get("window").width;

const Asuult4 = () => {
  const { language } = useLanguage();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const question4 = languages[language].question4;

  const isDarkMode = colorScheme === "dark";
  const backgroundColor = isDarkMode ? "#1e1e1e" : "#ffffff";
  const textColor = isDarkMode ? "#ffffff" : "#000000";
  const backButtonColor = isDarkMode ? "#FFFFFF" : "#000000";

  const [dates, setDates] = useState<Moment[]>([]);
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );

  useEffect(() => {
    const today = moment();
    const days = [];
    for (let i = 0; i < 14; i++) {
      days.push(today.clone().add(i, "days"));
    }
    setDates(days);
  }, []);

  const handleSelectDate = (date: Moment) => {
    setSelectedDate(date.format("YYYY-MM-DD"));
  };

  return (
    <View style={[styles.wrapper, { backgroundColor }]}>
      {/* Progress Bar */}
      <View style={styles.progressBar}>
        {[0, 1, 2, 3, 4].map((_, i) => (
          <View
            key={i}
            style={{
              width: 46,
              height: 8,
              borderRadius: 8,
              backgroundColor:
                i === 3
                  ? isDarkMode
                    ? "#ffffff" // active step in dark mode
                    : "#2c2c2c" // active step in light mode
                  : isDarkMode
                  ? "#2c2c2c" // inactive step in dark mode
                  : "#D1D5DB", // inactive step in light mode
            }}
          />
        ))}
      </View>

      {/* Question Section */}
      <View
        style={{ paddingTop: 100, marginBottom: 10, paddingHorizontal: 20 }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center", // "flex-start"-ыг "center" болгоно
            paddingHorizontal: 10,
            gap: 1, // Lottie болон текстийн хоорондын зайг тохируулна
          }}
        >
          <LottieView
            source={require("@/assets/icons/gem.json")}
            autoPlay
            loop
            style={{
              width: 35, // хэмжээг багасгаж
              height: 35,
              marginRight: 1, // эсвэл gap оронд хэрэглэж болно
            }}
          />
          <Text
            style={{
              fontSize: 24, // багасгаж болно
              fontWeight: "bold",
              textAlign: "left",
              color: textColor,
              flexShrink: 1,
            }}
          >
            {question4.chi}
          </Text>
        </View>
      </View>

      {/* Calendar Section */}
      <View style={styles.calendarSection}>
        <Text style={[styles.weekLabel, { color: textColor }]}>
          {question4.ene}
        </Text>
        <View style={styles.weekRow}>
          {dates.slice(0, 7).map((date) => {
            const isSelected = selectedDate === date.format("YYYY-MM-DD");
            return (
              <TouchableOpacity
                key={date.format("YYYY-MM-DD")}
                onPress={() => handleSelectDate(date)}
                style={[
                  styles.dayContainer,
                  isSelected && styles.selectedDayContainer,
                ]}
              >
                <Text style={[styles.dayText, isDarkMode && { color: "#aaa" }]}>
                  {date.format("dd").charAt(0)}
                </Text>
                <Text
                  style={[
                    styles.dateText,
                    isSelected && styles.selectedDate,
                    isDarkMode && !isSelected && { color: "#fff" },
                  ]}
                >
                  {date.format("D")}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={[styles.weekLabel, { color: textColor }]}>
          {question4.dar}
        </Text>
        <View style={styles.weekRow}>
          {dates.slice(7, 14).map((date) => {
            const isSelected = selectedDate === date.format("YYYY-MM-DD");
            return (
              <TouchableOpacity
                key={date.format("YYYY-MM-DD")}
                onPress={() => handleSelectDate(date)}
                style={[
                  styles.dayContainer,
                  isSelected && styles.selectedDayContainer,
                ]}
              >
                <Text style={[styles.dayText, isDarkMode && { color: "#aaa" }]}>
                  {date.format("dd").charAt(0)}
                </Text>
                <Text
                  style={[
                    styles.dateText,
                    isSelected && styles.selectedDate,
                    isDarkMode && !isSelected && { color: "#fff" },
                  ]}
                >
                  {date.format("D")}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Positioned "нэмэх" text */}
        <TouchableOpacity style={styles.addButton}>
          <Text style={{ color: "#136CF1", marginTop: -20, fontWeight: "500" }}>
            + {question4.nemeh}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Footer Section - same as Asuult3 */}
      <View
        style={{
          position: "absolute",
          bottom: 60, // арай дээш
          left: 0,
          right: 0,
          flexDirection: "row",
          justifyContent: "center", // голд төвлөрүүлсэн
          gap: 16,
        }}
      >
        {/* Буцах товч */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            padding: 10,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#d3d3d3",
            alignItems: "center",
            justifyContent: "center",
            width: 60,
            backgroundColor: isDarkMode ? "transparent" : "#FFFFFF",
          }}
        >
          <Text
            style={{ color: backButtonColor, fontWeight: "bold", fontSize: 28 }}
          >
            {"<"}
          </Text>
        </TouchableOpacity>

        {/* Дараах товч */}
        <TouchableOpacity
          onPress={() => router.push("/(meal)/asuult5")}
          style={{
            paddingVertical: 14,
            paddingHorizontal: 94,
            borderRadius: 12,
            backgroundColor: "#136CF1",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: 16 }}>
            {question4.daraah}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Asuult4;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    justifyContent: "flex-start",
  },
  progressBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 60,
    width: "100%",
  },
  progressStep: {
    width: 46,
    height: 8,
    borderRadius: 8,
    backgroundColor: "#D1D5DB",
  },
  activeStep: {
    backgroundColor: "#136CF1",
  },
  questionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  bullet: {
    fontSize: 16,
    marginRight: 8,
  },
  question: {
    fontSize: 24,
    fontWeight: "bold",
  },
  calendarSection: {
    justifyContent: "center",
    alignItems: "center",
  },
  weekLabel: {
    alignSelf: "flex-start",
    fontSize: 14,
    marginBottom: 8,
    marginTop: 10,
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: screenWidth - 48,
    marginBottom: 16,
  },
  dayContainer: {
    alignItems: "center",
    width: (screenWidth - 72) / 7,
    padding: 8,
  },
  selectedDayContainer: {
    backgroundColor: "#F0F8FF",
    borderRadius: 10,
  },
  dayText: {
    fontSize: 14,
    color: "#999",
    marginBottom: 4,
  },
  dateText: {
    fontSize: 14,
    padding: 8,
    borderRadius: 20,
    color: "#000",
  },
  selectedDate: {
    backgroundColor: "#136CF1",
    color: "#fff",
    fontWeight: "bold",
  },
  addButton: {
    alignSelf: "flex-start",
    marginTop: 10,
  },
});
