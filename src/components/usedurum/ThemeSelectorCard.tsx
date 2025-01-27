import React, { useEffect } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useTheme } from "../../stores/useTheme";
import { MoonIcon, SunIcon } from "lucide-react";

const ThemeSelectorCard: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    document.body.className = theme === "light" ? "text-black" : "text-white";
  }, [theme]);

  return (
    <Card
      className={`shadow border transform transition-all duration-500 ${
        theme === "light"
          ? "bg-white text-gray-800 border-gray-200"
          : "bg-gray-800 text-gray-200 border-gray-600"
      }`}
    >
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Tema Seçimi
          {theme === "light" ? (
            <SunIcon className="text-yellow-500 w-6 h-6 animate-pulse" />
          ) : (
            <MoonIcon className="text-blue-500 w-6 h-6 animate-pulse" />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <p className="text-center text-lg font-semibold">
            Geçerli Tema:{" "}
            <span
              className={`transition-colors duration-300 ${
                theme === "light" ? "text-yellow-600" : "text-blue-400"
              }`}
            >
              {theme === "light" ? "Açık" : "Koyu"}
            </span>
          </p>
          <p className="text-center text-sm mt-2">
            {theme === "light"
              ? "Aydınlık bir atmosferde gezin."
              : "Karanlık bir atmosferde çalışın."}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center mt-4">
        <Button
          onClick={toggleTheme}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transform transition-transform duration-300 hover:scale-105 ${
            theme === "light"
              ? "bg-yellow-500 hover:bg-yellow-600 text-white"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          {theme === "light" ? (
            <>
              <MoonIcon className="w-4 h-4" /> Koyu Tema
            </>
          ) : (
            <>
              <SunIcon className="w-4 h-4" /> Açık Tema
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ThemeSelectorCard;
