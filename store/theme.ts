import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type TTheme = "light" | "dark" | "system";
interface IState {
  theme: TTheme;
  setTheme: (t: TTheme) => void;
}

export const useTheme = create<IState>()(
  persist(
    (set) => ({
      theme: "system",
      setTheme: (t) => set({ theme: t }),
    }),
    {
      name: "theme-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => AsyncStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
