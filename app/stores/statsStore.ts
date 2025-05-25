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

  dailyFoods: {
    [key: string]: {
      food_name: string;
      image: string;
      calories: number;
      protein: number;
      carbs: number;
      fat: number;
    };
  };
  streak: number;
  highestStreak: number;
  totalCalories: number;

  breakFastEaten: boolean;
  lunchEaten: boolean;
  dinnerEaten: boolean;
  snackEaten: boolean;
  lastUpdated: string | null;
}

export interface StatsState extends StatsData {
  setField: <K extends keyof StatsData>(
    key: K,
    value: StatsData[K]
  ) => Promise<void>;
  load: () => Promise<void>;
  _hasHydrated: boolean;
  calculateStatsFromFoods: () => void;
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

  dailyFoods: {},
  streak: 0,
  highestStreak: 0,
  totalCalories: 0,

  breakFastEaten: false,
  lunchEaten: false,
  dinnerEaten: false,
  snackEaten: false,

  lastUpdated: null as string | null,

  _hasHydrated: false,

  calculateStatsFromFoods: () => {
    const { dailyFoods, breakFastEaten, lunchEaten, dinnerEaten, snackEaten } =
      get();
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;

    // Calculate totals only for eaten meals
    if (breakFastEaten && dailyFoods.breakfast) {
      const { calories, protein, carbs, fat } = dailyFoods.breakfast;
      totalCalories += Number(calories);
      totalProtein += Number(protein);
      totalCarbs += Number(carbs);
      totalFat += Number(fat);
    }

    if (lunchEaten && dailyFoods.lunch) {
      const { calories, protein, carbs, fat } = dailyFoods.lunch;
      totalCalories += Number(calories);
      totalProtein += Number(protein);
      totalCarbs += Number(carbs);
      totalFat += Number(fat);
    }

    if (dinnerEaten && dailyFoods.dinner) {
      const { calories, protein, carbs, fat } = dailyFoods.dinner;
      totalCalories += Number(calories);
      totalProtein += Number(protein);
      totalCarbs += Number(carbs);
      totalFat += Number(fat);
    }

    if (snackEaten && dailyFoods.snack) {
      const { calories, protein, carbs, fat } = dailyFoods.snack;
      totalCalories += Number(calories);
      totalProtein += Number(protein);
      totalCarbs += Number(carbs);
      totalFat += Number(fat);
    }

    // Update the store with calculated values
    set((state) => ({
      ...state,
      calories: totalCalories,
      protein: totalProtein,
      carbs: totalCarbs,
      fat: totalFat,
      totalCalories: state.totalCalories + totalCalories,
    }));
  },

  load: async () => {
    if (get()._hasHydrated) {
      return;
    }
    try {
      const storedStatsJson = await AsyncStorage.getItem(ASYNC_STORAGE_KEY);
      if (storedStatsJson) {
        const storedStats = JSON.parse(storedStatsJson) as Partial<StatsData>;
        const lastUpdated = storedStats.lastUpdated;

        // Check if the stored stats are from today
        if (lastUpdated) {
          const storedDate = new Date(lastUpdated);
          const today = new Date();

          if (storedDate.toDateString() === today.toDateString()) {
            // Use stored stats if they're from today
            set((state) => ({ ...state, ...storedStats, _hasHydrated: true }));
          } else {
            // Reset stats if they're from a previous day
            set((state) => ({
              ...state,
              steps: 0,
              water: 0,
              calories: 0,
              protein: 0,
              carbs: 0,
              fat: 0,
              sleep: 0,
              rdc: 0,
              breakFastEaten: false,
              lunchEaten: false,
              dinnerEaten: false,
              snackEaten: false,
              lastUpdated: new Date().toISOString(),
              _hasHydrated: true,
            }));
          }
        } else {
          set((state) => ({ ...state, ...storedStats, _hasHydrated: true }));
        }
      } else {
        set({ _hasHydrated: true, lastUpdated: new Date().toISOString() });
      }
    } catch (error) {
      console.error(
        "StatsStore: Error loading stats from AsyncStorage:",
        error
      );
      set({ _hasHydrated: true, lastUpdated: new Date().toISOString() });
    }
  },

  setField: async <K extends keyof StatsData>(key: K, value: StatsData[K]) => {
    set((state) => ({
      ...state,
      [key]: value,
      lastUpdated: new Date().toISOString(),
    }));

    // Recalculate stats if a meal eaten status changes
    if (
      key === "breakFastEaten" ||
      key === "lunchEaten" ||
      key === "dinnerEaten" ||
      key === "snackEaten"
    ) {
      get().calculateStatsFromFoods();
    }

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
    }
  },
}));
