import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";

import enTranslations from "../i18n/en.json";
import mnTranslations from "../i18n/mn.json";

type Language = "en" | "mn";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslations,
    },
    mn: {
      translation: mnTranslations,
    },
  },
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

const loadLanguage = async () => {
  try {
    const storedLanguage = (await AsyncStorage.getItem(
      "language"
    )) as Language | null;
    const deviceLanguage = Localization.getLocales()[0]?.languageCode as
      | Language
      | undefined;
    const initialLanguage = storedLanguage || deviceLanguage || "en";
    if (i18n.language !== initialLanguage) {
      await i18n.changeLanguage(initialLanguage);
    }
  } catch (error) {
    console.error("Failed to load language:", error);
    // Fallback to English if there's an error
    if (i18n.language !== "en") {
      await i18n.changeLanguage("en");
    }
  }
};

loadLanguage();

export const setLanguage = async (lang: Language) => {
  try {
    await AsyncStorage.setItem("language", lang);
    await i18n.changeLanguage(lang);
  } catch (error) {
    console.error("Failed to set language:", error);
  }
};

export { useTranslation, i18n };
