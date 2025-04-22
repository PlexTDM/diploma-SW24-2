import { useEffect, useRef, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { useRouter, useRootNavigationState } from "expo-router";

export default function RedirectScreen() {
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();
  const hasNavigated = useRef(false); // prevent multiple redirects

  useEffect(() => {
    if (!rootNavigationState?.key || hasNavigated.current) return;

    hasNavigated.current = true;
    router.replace("/(tabs)/home");
  }, [rootNavigationState]);

  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size="large" />
    </View>
  );
}
