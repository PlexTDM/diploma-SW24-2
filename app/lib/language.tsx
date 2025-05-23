import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
interface LanguageProviderProps {
  children: React.ReactNode;
}

type Language = "en" | "mn";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
};

export const mn = {
  question1: {
    tanid:
      "Танд анхаарах ёстой хоолны ямар нэгэн хорио цээр, дэглэм байгаа юу? ",
    suun: ["Сүүн сахар", "сахар", "Глютен", "Самар", "Дэглэм байхгүй"],
    daraah: "Дараах",
  },
  question2: {
    songo: "Та ямар хоолны дэглэм баримталдаг вэ?",
    bi: [
      "Би бүхнийг иддэг",
      "Цагаан хоол ",
      "Кето хоол",
      "Палео хоол",
      "Климатариан хоол",
      "Шүлтлэг хоол",
      "Загасны хоол",
    ],
    daraah: "Дараах",
  },
  question3: {
    ta: "Та өдөртөө ямар хоол идэх нь хэвшил болсон байдаг вэ?",
    ogloo: ["Өглөөний хоол", "Өдрийн хоол ", "Оройн хоол", "Амттан"],
    daraah: "Дараах",
  },
  question4: {
    chi: "Та ямар өдрүүдийн хоолыг төлөвлөж байна вэ?",
    ene: "Энэ долоо хоног",
    dar: "Дараа долоо хоног",
    daraah: "Дараах",
    nemeh: "Нэмэх",
  },
  question5: {
    zori: "Таньд зориулсан хоолны цэсийг бэлдэж байна.....",
  },
  meal: {
    meal: "Хоолны төрөл",
    type: [
      { name: "Өглөөний хоол", desc: "Өглөөний хоолоо идсэн үү?" },
      { name: "Өдрийн хоол", desc: "Өдрийн хоолоо идсэн үү?" },
      { name: "Оройн хоол", desc: "Оройн хоолоо идсэн үү?" },
      { name: "Зууш", desc: "Зууш идсэн үү?" },
    ],
  },

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
        title: "Таны зорилго юу вэ?",
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
          "Холестерины түвшин өндөр",
          "Амьсгалын замын өвчтэй (астма гэх мэт)",
          "Эмчийн заавар дор дасгал хийдэг",
          "Ходоодны өвчинтэй",
          "Хорт хавдар",
          "Бамбай булчирхайн өвчин",
          "Чихрийн шижин",
          "Өөр төрлийн өвчин",
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

  walk: {
    steps: "Алхалт",
    stepsCount: "Алхам тоолох",
    allowPermission: "Утасны тохиргоог өөрчилнө үү",
  },
  sleep: {
    sleep: "Нойр",
    duration: "цаг",
  },
  water: {
    word: "Ус",
    add: "Нэмэх",
    alarm: "Сануулга",
  },
  calories: {
    calorie: " Калори",
    kcal: "ккал",
  },
  Login: "Та нэвтэрч орно уу!",
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
    custom1: "Ямар дасгал хийхийг хүсэж байна вэ?",
    location: "Байршил",
    wtype: "Дасгалын Төрөл",
    time: "Хугацаа",
    muscle: "Булчин сонгох",
    muscle1:
      "Дасгалынхаа голчлон ажиллуулах булчинг сонгоно уу. Бусад булчингууд мөн тодорхой хэмжээгээр ажиллах боломжтой",
    inten: "Дасгалын эрчим",
    min: "74 мин",
    bul: "Нуруу, Гуя, Цээж",
    dund: "дунд зэргийн ачаалалтай",
    str: "хүчний дасгал",
    vid: "Видео дасгалжуулагч",
    hog: "Хөгжим & Дуу хоолой",
    aud: "Дууны тохиргоо",
    hugjim: "Хөгжим холбох",
    dasgal: "Яагаад энэ дасгал?",
    gejuu:
      "Дээд бие, доод бие, болон гол булчингуудыг хамтад нь ажиллуулах өнөөдрийн бэлтгэл – жинхэнэ хүч болон булчингийн масс бий болгоно. Хийх бүр сет таны булчин нэмэгдүүлэх зорилгод нэг алхмаар ойртуулна.",
    need: "Танд хэрэгтэй зүйлс",
    hiih: "Та юу хийх вэ",
    adapt: "Дасгалыг тохируулах",
    start: "Дасгалаа эхлэе",
    comp: "2 дасгалыг бүрэн гүйцэтгэ",
    urid: "Урьдчилсан хүчний оноо: 350–650",
    nerrr: "Дасгалын нэр",
    measure: "Биеийн тамирын түвшнээ хэмжих",
    test: "Bluvi-гийн 5 минутын тестийг дуусгасны дараа таны одоогийн фитнесийн түвшинг задлан шинжилж өгнө.",
  },
  profile1: {
    title: "Таны мэдээлэл",
    calories: "Калори",
    followers: "Дагагчид",
    timeline: "Түүх",
    stats: "Статистик",
    duels: "Өрсөлдөөн",
  },
  settings: {
    title: "Тохиргоо",
  },
  fortune: {
    title: "",
    desc: "Таны зорилгоо тодорхойлно",
  },

  home: {
    task: "Өнөөдрийн зорилт",
  },
  quiz: {
    title: "Асуулга өгөх",
    desc: "Ямар хоолны сонголт хийхээ мэдэхгүй байна уу? AI танд шийдэж өгнө",
  },
};

export const en = {
  question1: {
    tanid: "Do you have any dietary restrictions we should know about?",
    suun: ["Lactose Free", "Sugar Free", "Gluten free", "Nut Free", "None"],
    daraah: "Continue",
  },
  question2: {
    songo: "What's your preferred eating style?",
    bi: [
      "I eat everything",
      "Vegan",
      "Vegetarian",
      "Keto",
      "Paleo",
      "Climatarian",
      "Alkaline",
    ],
    daraah: "Continue",
  },

  question3: {
    ta: "Which meals do you usually have in a day?",
    ogloo: ["Breakfast", "Lunch", "Dinner", "Snacks"],
    daraah: "Continue",
  },
  question4: {
    chi: "Which days are you planning meals for?",
    ene: "This week",
    dar: "Next week",
    daraah: "Continue",
    nemeh: "Add",
  },
  question5: {
    zori: "Preparing your personalized menu....",
  },
  mascot: {
    name: "Bluvi",
    desc: "Let's Get Fit Together",
  },
  meal: {
    meal: "Meals",
    type: [
      { name: "Breakfast", desc: "Do you eat breakfast?" },
      { name: "Lunch", desc: "Do you eat lunch?" },
      { name: "Dinner", desc: "Do you eat dinner?" },
      { name: "Snack", desc: "Do you eat snacks?" },
    ],
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
        title: "What is your goal?",
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
          "High Cholesterol",
          "Respiratory issues (e.g., asthma)",
          "Exercising under medical supervision",
          "Gastric Disease",
          "Cancer",
          "Diabetes",
          "Thyroid Disease",
          "I have other",
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

  walk: {
    steps: "Steps",
    stepsCount: "Count Steps",
    allowPermission: "Allow permission in settings",
  },
  sleep: {
    sleep: "Sleep",
    duration: "hours",
  },
  water: {
    word: "Water",
    add: "Add",
    alarm: "Alarm",
  },
  calories: {
    calorie: "Calories",
    kcal: "kcal",
  },
  Login: "Please login to continue",
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
    custom1: "What would you like to do in our session?",
    location: "Location",
    wtype: "Workout Type",
    time: "Time",
    muscle: "Muscle Focus",
    muscle1: "Pick your workout's maiin muscles. It may include a few more. ",
    inten: "Intensity",
    min: "74 min",
    bul: "Back, Hamstrings, Chest",
    dund: "Medium intensity",
    str: "Strength",
    vid: "Video Coach",
    hog: "MUSIC & VOICE",
    aud: "Audio Settings",
    hugjim: "Connect Music",
    dasgal: "Why this workout?",
    gejuu:
      "Upper body, lower body, and core working together in today's gym session—build serious strength and muscle mass. Each set gets you closer to your muscle gain goal.",
    need: "What you'll need",
    hiih: "what you'll do",
    adapt: "Adapt Workout",
    start: "Start Workout",
    comp: "Complete 2 gym workouts",
    urid: "Preliminary Strength Score: 350-650",
    nerrr: "Workout Name",
    measure: "Measure your fitness level",
    test: "After Bluvi's 5-min test, you'll recieve an analysis of your current fitness levels.",
  },

  profile1: {
    title: "Your Profile",
    calories: "Total Calories",
    followers: "Followers",
    timeline: "Timeline",
    stats: "Stats",
    duels: "Duels",
  },
  settings: {
    title: "Settings",
  },
  home: {
    task: "Today's Tasks",
  },
  quiz: {
    title: "Take Quiz",
    desc: "Not sure what to eat? Let AI decide for you!",
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
