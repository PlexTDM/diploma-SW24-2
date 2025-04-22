import { create } from "zustand";

type RegisterState = {
  name: string;
  email: string;
  password: string;
  progress: number;
  setField: (key: string, value: string | number) => void;
};

export const useRegisterStore = create<RegisterState>((set) => ({
  name: "",
  email: "",
  password: "",
  progress: 0,
  setField: (key, value) => set((state) => ({ ...state, [key]: value })),
}));
