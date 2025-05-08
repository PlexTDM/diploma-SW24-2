import { create } from "zustand";

export const useRegisterStore = create<RegisterState>((set) => ({
  gender: "",
  birthday: null,
  weight: 0,
  height: 0,
  goal: "",
  activityLevel: "",
  mealPerDay: "",
  waterPerDay: "",
  workSchedule: "",
  healthCondition: "",

  email: "",
  password: "",
  progress: 0,
  setField: (key, value) => {
    console.log("setField", key, value);
    set((state) => ({ ...state, [key]: value }));
  },
}));
