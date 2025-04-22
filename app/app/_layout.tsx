import { useFonts } from "expo-font";
import { Stack } from "expo-router/stack";
import * as SplashScreen from "expo-splash-screen";
import { ThemeProvider, useAppTheme } from "@/lib/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeView } from "@/components";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import * as NavigationBar from "expo-navigation-bar";
import { ThemeSwitch } from "@/components/ThemeSwitch";
import Providers from "@/components/providers";
import "@/lib/global.css";
import { LangSwitch } from "@/components/LanguageSwtich";
import { View } from "react-native";

// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { theme } = useAppTheme();

  useEffect(() => {
    NavigationBar.setVisibilityAsync("hidden");
  }, []);

  return (
    <ThemeView>
      <SafeAreaView className={`flex-1`} edges={["top", "left", "right"]}>
        <ThemeProvider>
          <Providers>
            <StatusBar
              style={theme === "dark" ? "light" : "dark"}
              hidden={true}
            />
            <View className="flex flex-row w-full justify-between">
              <ThemeSwitch />
              <LangSwitch />
            </View>
            <Stack
              screenOptions={{
                headerShown: false,
              }}
              initialRouteName="(tabs)"
            >
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            </Stack>
          </Providers>
        </ThemeProvider>
      </SafeAreaView>
    </ThemeView>
  );
}
