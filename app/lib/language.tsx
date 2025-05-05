import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

export const mn = {
  mascot: {
    name: "Блуви",
    desc: "Хамтдаа эрүүл, чийрэг биетэй болцгооё!",
  },
  login: {
    title1: "Сайн байна уу! Би бол Блуви!",
    title2: "Хамтдаа эрүүл, чийрэг биетэй болцгооё!",
    button1: "Нэвтрэх",
    button2: "Бүртгүүлэх",
  },
  register: {
    age: "Таны Төрсөн өдөр?",
    steps: {
      goal: {
        title: "Таны зорилго?",
        desc: "Таны сонголт дасгалын хөтөлбөрт тань нөлөөлнө",
        choices: [
          "Жингээ хасах",
          "Жингээ барих",
          "Жингээ нэмэх",
          "Стресс бууруулах",
          "Ерөнхий биеийн чийрэгжилт",
        ],
      },
    },
  },
  home: {
    title: "Өнөөдрийн мэдээлэл",
  },
  walk: {
    steps: "Алхалт",
    stepsCount: "Алхам тоолох",
  },
  sleep: {
    sleep: "Нойр",
    duration: "цаг",
  },
  welcome: "Тавтай морил",
  logout: "Гарах",
  profile: "Профайл",
  back: "Өмнөх",
  next: "Дараах",
};

export const en = {
  mascot: {
    name: "Bluvi",
    desc: "Let's Get Fit Together",
  },
  login: {
    title1: "Hi There! I'm Bluvi",
    title2: "Let's Get Fit Together",
    button1: "Login",
    button2: "Sign Up",
  },
  register: {
    age: "How old are you?",
    steps: {
      goal: {
        title: "Your Goal?",
        desc: "Your choice will affect your workout plan",
        choices: [
          "Lose weight",
          "Keep fit",
          "Gain weight",
          "Reduce stress",
          "General fitness",
        ],
      },
    },
  },
  home: {
    title: "Today's information",
  },
  walk: {
    steps: "Steps",
    stepsCount: "Count Steps",
  },
  sleep: {
    sleep: "Sleep",
    duration: "hours",
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

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
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
