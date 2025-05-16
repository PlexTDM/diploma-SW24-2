interface LanguageProviderProps {
  children: React.ReactNode;
}

type Language = "en" | "mn";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
};

interface RegisterState {
  username: string;
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
  progress: number;
  setField: (key: keyof Omit<RegisterState, "setField">, value: any) => void;
}

type registerFormType = {
  username: string;
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

type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: any;
};

type DataType = {
  label: string;
  date: string;
  value: number;
};

type User = {
  username: string;
  email: string;
  stats?: Record<string, any>;
  gender: Gender;
  birthday: Date;
  height: number;
  weight: number;
  goal: string;
  activityLevel: string;
  mealPerDay: string;
  waterPerDay: string;
  workSchedule: string;
  healthCondition: string;
  password: string;
  role: Role;
  bio?: string;
  image?: string | null;
  posts?: string[];
  isEmailVerified: boolean;
  emailVerificationToken?: string;
  emailVerificationTokenExpiry?: Date;
  createdAt?: Date;
  updatedAt?: Date;
};

type Message = {
  id: string;
  content: string;
  role: "user" | "model" | "system";
  timestamp: Date;
};
