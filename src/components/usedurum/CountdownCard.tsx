import React from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useCountdown } from "../../stores/useCountdown";
import { useTheme } from "../../stores/useTheme";

const CountdownCard: React.FC = () => {
  const { timeLeft, startCountdown, stopCountdown, resetCountdown } =
    useCountdown();
  const { theme } = useTheme();
  const isLightTheme = theme === "light";

  return (
    <Card
      className={`shadow border ${
        theme === "light"
          ? "bg-white text-gray-800 border-gray-200"
          : "bg-gray-800 text-gray-200 border-gray-600"
      }`}
    >
      <CardHeader>
        <CardTitle>Geri Sayım</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg font-semibold text-center">
          Kalan Süre: {timeLeft} saniye
        </p>
      </CardContent>
      <CardFooter className="flex gap-4 justify-center">
        <Button
          variant={isLightTheme ? "default" : "secondary"}
          onClick={() => startCountdown(60)}
        >
          60 Saniye Başlat
        </Button>
        <Button
          className={`${
            isLightTheme
              ? "bg-gray-200 hover:bg-gray-300 text-gray-900"
              : "bg-gray-600 hover:bg-gray-500 text-gray-100"
          }`}
          onClick={stopCountdown}
        >
          Durdur
        </Button>
        <Button variant="destructive" onClick={resetCountdown}>
          Sıfırla
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CountdownCard;
