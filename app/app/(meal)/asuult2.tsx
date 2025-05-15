import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  useColorScheme,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { languages, useLanguage } from "@/lib/language";
import LottieView from "lottie-react-native";
const Asuult2 = () => {
  const { language } = useLanguage();
  const router = useRouter();
  const colorScheme = useColorScheme();

  const question2 = languages[language].question2;
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (!question2) {
    return <Text>Ачааллаж байна...</Text>;
  }

  const isDarkMode = colorScheme === "dark";
  const backgroundColor = isDarkMode ? "#1e1e1e" : "#ffffff";
  const textColor = isDarkMode ? "#ffffff" : "#000000";
  const borderColor = isDarkMode ? "#444" : "#ccc";
  const backButtonColor = isDarkMode ? "#FFFFFF" : "#000000";
  const selectedBorderColor = isDarkMode ? "#ffffff" : "#2c2c2c";

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: backgroundColor,
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      {/* Progress Bar */}
      <View style={styles.progressBar}>
        {[0, 1, 2, 3, 4].map((i) => (
          <View
            key={i}
            style={{
              width: 46,
              height: 8,
              borderRadius: 8,
              backgroundColor:
                i === 1
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

      {/* Асуулт */}
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
            {question2.songo}
          </Text>
        </View>
      </View>

      {/* Сонголтууд */}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={question2.bi}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 50, paddingTop: 60 }}
        renderItem={({ item, index }) => {
          const isSelected = selectedIndex === index;
          return (
            <TouchableOpacity
              onPress={() => setSelectedIndex(index)}
              style={{
                borderWidth: 1.5,
                borderColor: isSelected ? selectedBorderColor : borderColor,
                paddingVertical: 15,
                paddingHorizontal: 12,
                borderRadius: 10,
                marginBottom: 30,
                width: 330,
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Text style={{ color: textColor, fontSize: 16 }}>{item}</Text>
              {isSelected && (
                <Text style={{ color: selectedBorderColor, fontSize: 20 }}>
                  ✓
                </Text>
              )}
            </TouchableOpacity>
          );
        }}
      />

      {/* Товчнууд */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 10,
          marginBottom: 40,
          width: 340,
        }}
      >
        {/* Буцах */}
        <TouchableOpacity
          onPress={() => router.push("/asuult")}
          style={{
            padding: 8,
            borderRadius: 8,
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

        {/* Дараах */}
        <TouchableOpacity
          onPress={() => router.push("/(meal)/asuult3")}
          disabled={selectedIndex === null}
          style={{
            padding: 16,
            borderRadius: 12,
            backgroundColor: selectedIndex === null ? "#ccc" : "#136CF1",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            marginLeft: 10,
          }}
        >
          <Text style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: 16 }}>
            {question2.daraah}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: "#2563EB",
  },
  questionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  bullet: {
    fontSize: 16,
    marginRight: -20, // Bullet тэмдэгтэй асуултны текстийн зайг багасгах
  },
  question: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Asuult2;
