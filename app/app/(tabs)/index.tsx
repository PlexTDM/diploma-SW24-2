import { useRootNavigationState, useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { ActivityIndicator, View } from "react-native";

export default function RedirectScreen() {
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();
  const hasNavigated = useRef(false); // prevent multiple redirects

  useEffect(() => {
    if (!rootNavigationState?.key || hasNavigated.current) return;

    hasNavigated.current = true;
    router.replace("/(tabs)/home");
  }, [rootNavigationState, router]);

  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size="large" />
    </View>
  );
}
