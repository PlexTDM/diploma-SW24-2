import React, { useRef, useCallback } from "react";
import LottieView from "lottie-react-native";
import { View } from "react-native";
import { useFocusEffect } from "expo-router";

export default function Flame({ size = 100 }: { size?: number }) {
  const animationRef = useRef<LottieView>(null);

  // play once
  // useEffect(() => {
  //   animationRef.current?.play();
  // }, []);

  // play the animation when the component is focused
  useFocusEffect(
    useCallback(() => {
      animationRef.current?.play();
    }, [])
  );
  return (
    <View className="absolute -bottom-[15px] mb-4">
      <LottieView
        ref={animationRef}
        source={require("@/assets/icons/flame.json")}
        autoPlay={false}
        loop={false}
        style={{
          width: size,
          height: size,
        }}
      />
    </View>
  );
}
