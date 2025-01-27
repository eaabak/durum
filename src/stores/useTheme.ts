import { create, LocalStorageAdapter } from "../library/src";

interface ThemeState {
  theme: "light" | "dark";
  toggleTheme: () => void;
  setTheme: (theme: "light" | "dark") => void;
}

export const useTheme = create<ThemeState>(
  (set) => {
    const storageKey = "theme";

    const initializeTheme = async () => {
      const savedTheme = await LocalStorageAdapter.getItem(storageKey);
      if (savedTheme === "light" || savedTheme === "dark") {
        set(() => ({ theme: savedTheme }));
      }
    };

    initializeTheme();

    return {
      theme: "light",
      toggleTheme: async () => {
        set((state) => {
          const newTheme = state.theme === "light" ? "dark" : "light";
          LocalStorageAdapter.setItem(storageKey, newTheme);
          return { theme: newTheme };
        });
      },
      setTheme: async (theme) => {
        await LocalStorageAdapter.setItem(storageKey, theme);
        set(() => ({ theme }));
      },
    };
  },
  [],
  "ThemeStore"
);
