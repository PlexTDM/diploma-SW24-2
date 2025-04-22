import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme, View } from "react-native";
import { useColorScheme as useNativeColorScheme } from "nativewind";

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
  const { setColorScheme } = useNativeColorScheme();
  const [theme, setThemeState] = useState<Theme>("light");
  setColorScheme(theme);

  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem(THEME_KEY);
      setThemeState((stored as Theme) || (system as Theme) || "light");
    })();
  }, [system]);

  const setTheme = async (newTheme: Theme) => {
    await AsyncStorage.setItem(THEME_KEY, newTheme);
    setThemeState(newTheme);
    setColorScheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => useContext(ThemeContext);
