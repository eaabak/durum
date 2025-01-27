import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { useCalculator } from "../../stores/useCalculator";
import { useTheme } from "../../stores/useTheme";

const Calculator: React.FC = () => {
  const { display, clear, input, setOperator, calculate } = useCalculator();
  const { theme } = useTheme();

  return (
    <Card
      className={`shadow border ${
        theme === "light"
          ? "bg-white text-gray-800 border-gray-200"
          : "bg-gray-800 text-gray-200 border-gray-600"
      }`}
    >
      <CardHeader>
        <CardTitle>Hesap Makinesi</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Ekran */}
        <div
          className={`p-4 rounded text-right text-xl font-mono ${
            theme === "light" ? "bg-gray-100" : "bg-gray-700"
          }`}
        >
          {display}
        </div>
        {/* Butonlar */}
        <div className="grid grid-cols-4 gap-2 mt-4">
          {["7", "8", "9", "/"].map((btn) => (
            <Button
              key={btn}
              className={`${
                theme === "light"
                  ? "bg-gray-200 hover:bg-gray-300 text-gray-900"
                  : "bg-gray-600 hover:bg-gray-500 text-gray-100"
              }`}
              onClick={() => (btn === "/" ? setOperator("/") : input(btn))}
            >
              {btn}
            </Button>
          ))}
          {["4", "5", "6", "*"].map((btn) => (
            <Button
              key={btn}
              className={`${
                theme === "light"
                  ? "bg-gray-200 hover:bg-gray-300 text-gray-900"
                  : "bg-gray-600 hover:bg-gray-500 text-gray-100"
              }`}
              onClick={() => (btn === "*" ? setOperator("*") : input(btn))}
            >
              {btn}
            </Button>
          ))}
          {["1", "2", "3", "-"].map((btn) => (
            <Button
              key={btn}
              className={`${
                theme === "light"
                  ? "bg-gray-200 hover:bg-gray-300 text-gray-900"
                  : "bg-gray-600 hover:bg-gray-500 text-gray-100"
              }`}
              onClick={() => (btn === "-" ? setOperator("-") : input(btn))}
            >
              {btn}
            </Button>
          ))}
          {["0", ".", "=", "+"].map((btn) => (
            <Button
              key={btn}
              className={`${
                theme === "light"
                  ? "bg-gray-200 hover:bg-gray-300 text-gray-900"
                  : "bg-gray-600 hover:bg-gray-500 text-gray-100"
              }`}
              onClick={() => {
                if (btn === "=") calculate();
                else if (btn === "+") setOperator("+");
                else input(btn);
              }}
            >
              {btn}
            </Button>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="destructive"
          className={`w-full ${
            theme === "light"
              ? "bg-red-600 hover:bg-red-700 text-white"
              : "bg-red-800 hover:bg-red-900 text-white"
          }`}
          onClick={clear}
        >
          Temizle
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Calculator;
