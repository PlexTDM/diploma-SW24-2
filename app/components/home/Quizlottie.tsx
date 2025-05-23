import React from "react";
import LottieView from "lottie-react-native";
import { View } from "react-native";

export default function QuizLottie() {
  return (
    <View
      style={{ width: 130, height: 150, overflow: "hidden" }}
      className="items-center justify-center flex-1"
    >
      <LottieView
        source={require("@/assets/lottie/quiz.json")}
        autoPlay
        loop
        style={{ width: 130, height: 150 }}
      />
    </View>
  );
}
