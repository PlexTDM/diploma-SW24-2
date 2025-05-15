import { ThemeView, LangSwitch, ThemeSwitch, Providers } from "@/components";
import { View, Text, Platform } from "react-native";
import { ThemeProvider, useAppTheme } from "@/lib/theme";
import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router/stack";
import "@/lib/global.css";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

// import { useEffect } from "react";
// import * as NavigationBar from "expo-navigation-bar";
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const { theme } = useAppTheme();

  const [loaded, error] = useFonts({
    Quicksand: require("../assets/fonts/Quicksand-Variable.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // useEffect(() => {
  //   const setNavigationBar = async () => {
  //     if (Platform.OS === "android") {
  //       await NavigationBar.setVisibilityAsync("hidden");
  //     }
  //   };
  //   setNavigationBar();
  // }, []);

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
              presentation: Platform.OS === "ios" ? "modal" : "card",
              animation: Platform.OS === "ios" ? "flip" : "ios_from_right",
            }}
            initialRouteName="(tabs)"
          >
            <Stack.Screen
              name="(tabs)"
              options={{ animation: "default", presentation: "card" }}
            />
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(meal)" />
            <Stack.Screen
              name="home"
              options={{ animation: "default", presentation: "card" }}
            />
            <Stack.Screen name="chatbot" />
            <Stack.Screen name="mnkv" options={{animation:'default', presentation:'card'}} />
          </Stack>
        </Providers>
      </ThemeProvider>
      {/* </SafeAreaView> */}
    </ThemeView>
  );
};

export default RootLayout;
