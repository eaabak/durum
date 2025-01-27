import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "../stores/useTheme";

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      className="group/toggle h-8 w-8 px-0"
      onClick={toggleTheme}
    >
      {theme === "light" ? (
        <SunIcon className="block" />
      ) : (
        <MoonIcon className="block" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
