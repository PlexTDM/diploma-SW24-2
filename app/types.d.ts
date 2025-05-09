interface LanguageProviderProps {
  children: React.ReactNode;
}

type Language = "en" | "mn";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
};

interface RegisterState {
  gender: string;
  birthday: Date | null;
  weight: number;
  height: number;
  goal: string;
  activityLevel: string;
  mealPerDay: string;
  waterPerDay: string;
  workSchedule: string;
  healthCondition: string;

  email: string;
  password: string;
  progress: number;
  setField: (key: keyof Omit<RegisterState, "setField">, value: any) => void;
}

type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: any;
};

type registerFormType = {
  gender: string;
  birthday: Date;
  weight: number;
  height: number;
  goal: string;
  activityLevel: string;
  mealPerDay: string;
  waterPerDay: string;
  workSchedule: string;
  healthCondition: string;
  email: string;
  password: string;
};
