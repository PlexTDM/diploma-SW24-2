import { create } from "zustand";

interface StatsState {
  steps: number;
  water: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  sleep: number;
  rdc: number;

  stepsGoal: number;
  waterGoal: number;
  caloriesGoal: number;
  proteinGoal: number;
  carbsGoal: number;
  fatGoal: number;
  sleepGoal: number;
  rdcGoal: number;

  setField: (key: keyof Omit<StatsState, "setField">, value: any) => void;
}

export const useRegisterStore = create<StatsState>((set) => ({
  steps: 0,
  water: 0,
  calories: 0,
  protein: 0,
  carbs: 0,
  fat: 0,
  sleep: 0,
  rdc: 0,

  stepsGoal: 0,
  waterGoal: 0,
  caloriesGoal: 0,
  proteinGoal: 0,
  carbsGoal: 0,
  fatGoal: 0,
  sleepGoal: 0,
  rdcGoal: 0,

  setField: (key, value) => {
    console.log("setField", key, value);
    set((state) => ({ ...state, [key]: value }));
  },
}));
