import { ThemeView, ThemeText } from "@/components";
import { useRouter } from "expo-router";
import { Pressable } from "react-native";

export default function Tab() {
  const router = useRouter();
  return (
    <ThemeView className="items-center justify-center">
      <Pressable onPress={() => router.push("/(auth)/welcome")}>
        <ThemeText>Login</ThemeText>
      </Pressable>
    </ThemeView>
  );
}
