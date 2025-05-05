import { ThemeView } from "@/components";
import { Stack } from "expo-router";

export default function TabLayout() {
  return (
    <ThemeView>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="water" />
        <Stack.Screen name="steps" />
        <Stack.Screen name="sleep" />
        <Stack.Screen name="calories" />
        <Stack.Screen name="training" />
      </Stack>
    </ThemeView>
  );
}
