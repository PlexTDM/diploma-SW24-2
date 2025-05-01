import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme, View } from "react-native";
import {
  useColorScheme as useNativeColorScheme,
  colorScheme,
} from "nativewind";

const THEME_KEY = "app-theme";

type Theme = "light" | "dark";
type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  setTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const system = useColorScheme();
  const [theme, setThemeState] = useState<Theme>("light");

  // Initialize theme from storage or system
  useEffect(() => {
    const initializeTheme = async () => {
      try {
        const stored = await AsyncStorage.getItem(THEME_KEY);
        const initialTheme = (stored as Theme) || (system as Theme) || "light";
        setThemeState(initialTheme);
        colorScheme.set(initialTheme);
      } catch (error) {
        console.error("Error initializing theme:", error);
      }
    };

    initializeTheme();
  }, [system]);

  const setTheme = async (newTheme: Theme) => {
    try {
      await AsyncStorage.setItem(THEME_KEY, newTheme);
      setThemeState(newTheme);
      colorScheme.set(newTheme);
    } catch (error) {
      console.error("Error setting theme:", error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <View className={`${theme === "dark" ? "dark" : "light"} flex-1`}>
        {children}
      </View>
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => useContext(ThemeContext);
