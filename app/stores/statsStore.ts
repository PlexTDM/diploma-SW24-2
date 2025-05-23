import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

interface StatsData {
  steps: number;
  water: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  sleep: number;
  rdc: number; //RDC stands for (e.g., Resting Daily Calories)

  stepsGoal: number;
  waterGoal: number;
  caloriesGoal: number;
  proteinGoal: number;
  carbsGoal: number;
  fatGoal: number;
  sleepGoal: number;
  rdcGoal: number;
}

export interface StatsState extends StatsData {
  setField: <K extends keyof StatsData>(
    key: K,
    value: StatsData[K]
  ) => Promise<void>;
  load: () => Promise<void>;
  _hasHydrated: boolean;
}

const ASYNC_STORAGE_KEY = "appStatsStore";

const getPersistentState = (state: StatsState): StatsData => {
  const { setField, load, _hasHydrated, ...persistentData } = state;
  return persistentData;
};

export const useStatsStore = create<StatsState>((set, get) => ({
  steps: 0,
  water: 0,
  calories: 0,
  protein: 0,
  carbs: 0,
  fat: 0,
  sleep: 0,
  rdc: 0,

  stepsGoal: 7500,
  waterGoal: 3500, // ml
  caloriesGoal: 2000,
  proteinGoal: 100, // gram
  carbsGoal: 250,
  fatGoal: 70,
  sleepGoal: 8 * 60, // 8 tsag
  rdcGoal: 0,

  _hasHydrated: false,

  load: async () => {
    if (get()._hasHydrated) {
      return;
    }
    try {
      const storedStatsJson = await AsyncStorage.getItem(ASYNC_STORAGE_KEY);
      if (storedStatsJson) {
        const storedStats = JSON.parse(storedStatsJson) as Partial<StatsData>;
        set((state) => ({ ...state, ...storedStats, _hasHydrated: true }));
      } else {
        set({ _hasHydrated: true });
      }
    } catch (error) {
      console.error(
        "StatsStore: Error loading stats from AsyncStorage:",
        error
      );
      set({ _hasHydrated: true });
    }
  },

  setField: async <K extends keyof StatsData>(key: K, value: StatsData[K]) => {
    set((state) => ({ ...state, [key]: value }));
    try {
      const currentState = get();
      const dataToPersist = getPersistentState(currentState);

      await AsyncStorage.setItem(
        ASYNC_STORAGE_KEY,
        JSON.stringify(dataToPersist)
      );
    } catch (error) {
      console.error(
        `StatsStore: Error saving field '${key}' to AsyncStorage:`,
        error
      );
      // You might want to add error handling here, e.g., revert the optimistic update
      // or notify the user. For now, we'll just log the error.
    }
  },
}));
