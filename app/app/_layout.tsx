import { ThemeView, LangSwitch, ThemeSwitch, Providers } from "@/components";
import { setBehaviorAsync, setVisibilityAsync } from "expo-navigation-bar";
import { Platform, SafeAreaView, View } from "react-native";
import { ThemeProvider, useAppTheme } from "@/lib/theme";
import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router/stack";
import { useEffect } from "react";
import "@/lib/global.css";

// SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const { theme } = useAppTheme();

  useEffect(() => {
    const hideNavBar = async () => {
      setVisibilityAsync("hidden");
      setBehaviorAsync("inset-swipe");
      // setBehaviorAsync("overlay-swipe");
    };
    if (Platform.OS === "android") {
      hideNavBar();
    }
  }, []);

  return (
    <ThemeView>
      <SafeAreaView className={`flex-1`}>
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
};

export default RootLayout;
