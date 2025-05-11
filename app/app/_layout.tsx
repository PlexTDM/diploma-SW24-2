import { ThemeView, LangSwitch, ThemeSwitch, Providers } from "@/components";
import { Platform, View } from "react-native";
import { ThemeProvider, useAppTheme } from "@/lib/theme";
import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router/stack";
import "@/lib/global.css";
import * as NavigationBar from "expo-navigation-bar";
import { useEffect } from "react";
import { useRouter } from "expo-router";

// SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const { theme } = useAppTheme();

  useEffect(() => {
    const setNavigationBar = async () => {
      if (Platform.OS === "android") {
        // Set the navigation bar style
        NavigationBar.setStyle("dark");
        const visibility = await NavigationBar.getVisibilityAsync();
        await NavigationBar.setVisibilityAsync("hidden");
        console.log(visibility);
      }
    };
    setNavigationBar();
  }, []);

  const router = useRouter();

  router.replace("/(tabs)/home");

  return (
    <ThemeView>
      {/* <SafeAreaView className={`flex-1`}> */}
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
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(meal)" />
            <Stack.Screen name="chatbot" />
          </Stack>
        </Providers>
      </ThemeProvider>
      {/* </SafeAreaView> */}
    </ThemeView>
  );
};

export default RootLayout;
