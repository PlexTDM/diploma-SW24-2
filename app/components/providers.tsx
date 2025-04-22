import { LanguageProvider } from "@/lib/language";
import { useAppTheme } from "@/lib/theme";
import React from "react";
import { View } from "react-native";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";

const ThemeUser = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useAppTheme();
  return (
    <View className={`${theme} flex-1`}>
      <PaperProvider theme={theme === "dark" ? MD3DarkTheme : MD3LightTheme}>
        <LanguageProvider>{children}</LanguageProvider>
      </PaperProvider>
    </View>
  );
};

export default ThemeUser;
