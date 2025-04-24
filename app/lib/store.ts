import { create } from "zustand";

type RegisterState = {
  name: string;
  email: string;
  password: string;
  progress: number;
  goal: string;
  age: number;
  gender: string;
  weight: number;
  height: number;
  setField: (key: string, value: string | number) => void;
};

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
  setField: (key, value) => set((state) => ({ ...state, [key]: value })),
}));
