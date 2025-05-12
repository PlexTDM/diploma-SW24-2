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
    username: "Нэр",
    register: "Бүртгүүлэх",
    email: "Имэйл",
    password: "Нууц үг",
    button: {
      button1: "Өмнөх",
      button2: "Дараах",
    },
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
      activity: {
        title: "Таны хөдөлгөөний түвшин ямар вэ?",
        desc: "Таны сонголт дасгалын хөтөлбөрт тань нөлөөлнө",
        choices: [
          "Маш идэвхтэй (өдөр бүр дасгал хийдэг)",
          "Дунд зэрэг (7 хоногт 2-3 удаа дасгал хийдэг)",
          "Идэвхгүй (7 хоногт 1 удаа эсвэл огт биш)",
        ],
      },
      meals: {
        title: "Та өдөрт хэдэн удаа хооллодог вэ?",
        desc: "Таны сонголт дасгалын хөтөлбөрт тань нөлөөлнө",
        choices: ["4+ удаа", "2-3 удаа", "1 удаа"],
      },
      water: {
        word: "Ус",
        milliliter: "м/литр",
        title: "Та өдөрт хэдэн литр ус уудаг вэ?",
        desc: "Таны сонголт дасгалын хөтөлбөрт тань нөлөөлнө",
        choices: ["4+ литр", "2-3 литр", "1 литр"],
      },
      work: {
        title: "Таны ажлын хуваарь ямар вэ?",
        desc: "Таны сонголт дасгалын хөтөлбөрт тань нөлөөлнө",
        choices: [
          "Уян хатан хуваарьтай",
          "Байнгын цагаар ажилладаг (09:00–17:00)",
          "Ээлжийн ажил",
          "Ачаалалтай / завгүй хуваарьтай",
          "Одоогоор ажилгүй / завтай байгаа",
        ],
      },
      health: {
        title: "Танд эрүүл мэндийн ямар нэгэн асуудал байгаа юу?",
        desc: "Таны сонголт дасгалын хөтөлбөрт тань нөлөөлнө",
        choices: [
          "Үгүй, би эрүүл",
          "Нуруу, үе мөчний асуудалтай",
          "Зүрх судасны асуудалтай",
          "Амьсгалын замын өвчтэй (астма гэх мэт)",
          "Эмчийн заавар дор дасгал хийдэг",
        ],
      },
      step1: {
        title: "Таны профайлыг бүрэн гүйцээцгээе",
        desc: "Таны сонголт дасгалын хөтөлбөрт тань нөлөөлнө",
        date: "Төрсөн өдрөө сонгоно уу",
        weight: "Жин",
        height: "Өндөр",
        question1: {
          title: "Та хүйсээ сонгоно уу",
          choices: {
            1: "Эрэгтэй",
            2: "Эмэгтэй",
            3: "Бусад",
          },
        },
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

  calories: {
    calorie: " Калори",
    kcal: "ккал",
  },
  welcome: "Тавтай морил",
  logout: "Гарах",
  profile: "Профайл",
  back: "Өмнөх",
  next: "Дараах",
  training: {
    workout: "Бэлтгэл",
    duration: ["минут"],
    hi: "Сайн байна уу",
    hello: "Өнөөдөр хэр байна даа?",
    special: "Зөвхөн танд зориулсан",
    custom: "Өөрийн дасгал",
    get: "Өөрийн Зорилгоо Тодорхойлох",
  },
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
    username: "Username",
    age: "How old are you?",
    email: "Email",
    password: "Password",
    register: "Register",
    button: {
      button1: "Back",
      button2: "Next",
    },
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
      activity: {
        title: "What's your current activity level?",
        desc: "Your choice will affect your workout plan",
        choices: [
          "Very active (exercises every day)",
          "Moderate (exercises 2–3 times a week)",
          "Inactive (exercises once a week or not at all)",
        ],
      },
      meals: {
        title: "How many meals do you have per day?",
        desc: "Your choice will affect your workout plan",
        choices: ["4 meals or more", "2-3 meals per day", "1 meal per day"],
      },
      water: {
        word: "Water",
        milliliter: "ml",
        title: "How much water do you drink per day?",
        desc: "Your choice will affect your workout plan",
        choices: ["4 liters or more", "2-3 liters per day", "1 liter per day"],
      },
      work: {
        title: "What is your current work schedule?",
        desc: "Your choice will affect your workout plan.",
        choices: [
          "Flexible schedule",
          "Regular hours (9:00 AM – 5:00 PM)",
          "Shift work",
          "Busy or irregular schedule",
          "Currently not working / have free time",
        ],
      },
      health: {
        title: "Do you have any health conditions?",
        desc: "Your choice will affect your workout plan.",
        choices: [
          "No, I'm healthy",
          "Back or joint problems",
          "Heart or cardiovascular condition",
          "Respiratory issues (e.g., asthma)",
          "Exercising under medical supervision",
        ],
      },
      step1: {
        title: "Let's complete your profile",
        desc: "Your choice will affect your workout plan.",
        date: "Date of birth",
        weight: "Weight",
        height: "Height",
        question1: {
          title: "Choose gender",
          choices: {
            1: "Male",
            2: "Female",
            3: "Other",
          },
        },
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

  calories: {
    calorie: "Calories",
    kcal: "kcal",
  },
  welcome: "Welcome",
  logout: "Logout",
  profile: "Profile",
  back: "Back",
  next: "Next",
  training: {
    workout: "Training",
    duration: ["minutes"],
    hi: "Hi there",
    hello: "Good day so far?",
    special: "Special for you",
    custom: "Custom workout",
    get: "Get a Strength Goal",
  },
};

export const languages = {
  mn,
  en,
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

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
