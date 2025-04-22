import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

export const mn = {
  login: {
    title1: "Сайн байна уу! Би бол Блуви!",
    title2: "Хамтдаа эрүүл, чийрэг биетэй болцгооё!",
    button1: "Эхлэх",
    button2: "Бүртгэлтэй юу?",
  },
  register: {
    age: "Таны Төрсөн өдөр?",
  },
  welcome: "Тавтай морил",
  logout: "Гарах",
  profile: "Профайл",
  back: "Өмнөх",
  next: "Дараах",
};

export const en = {
  login: {
    title1: "Hi There! I'm Bluvi",
    title2: "Let's Get Fit Together",
    button1: "Start Journey",
    button2: "Already Have an Account?",
  },
  register: {
    age: "How old are you?",
  },
  welcome: "Welcome",
  logout: "Logout",
  profile: "Profile",
  back: "Back",
  next: "Next",
};

export const languages = {
  mn,
  en,
};

type Language = "en" | "mn";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    (async () => {
      const stored = (await AsyncStorage.getItem("language")) as Language;
      setLanguage((stored as Language) || "en");
    })();
  }, []);

  const handleSetLanguage = async (lang: Language) => {
    await AsyncStorage.setItem("language", lang);
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: handleSetLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
