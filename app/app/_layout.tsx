import { ThemeView, LangSwitch, ThemeSwitch, Providers } from "@/components";
import { SafeAreaView, View } from "react-native";
import { ThemeProvider, useAppTheme } from "@/lib/theme";
import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router/stack";
import "@/lib/global.css";

// SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const { theme } = useAppTheme();

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
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen name="(meal)" options={{ headerShown: false }} />
            </Stack>
          </Providers>
        </ThemeProvider>
      {/* </SafeAreaView> */}
    </ThemeView>
  );
};

export default RootLayout;
