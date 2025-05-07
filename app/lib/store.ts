import { create } from "zustand";

interface RegisterState {
  name: string;
  email: string;
  password: string;
  progress: number;
  goal: string;
  age: number;
  gender: string;
  weight: number;
  height: number;
  birthday: Date | null;
  setField: (key: keyof Omit<RegisterState, "setField">, value: any) => void;
}

export const useRegisterStore = create<RegisterState>((set) => ({
  name: "",
  email: "",
  password: "",
  progress: 0,
  goal: "",
  age: 0,
  gender: "",
  weight: 0,
  height: 0,
  birthday: null,
  setField: (key, value) => set((state) => ({ ...state, [key]: value })),
}));
