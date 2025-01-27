import React, { useEffect } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useClock } from "../../stores/useClock";
import { useTheme } from "../../stores/useTheme";

const ClockCard: React.FC = () => {
  const { time, startClock, stopClock } = useClock();
  const { theme } = useTheme();

  useEffect(() => {
    startClock();
    return () => stopClock();
  }, [startClock, stopClock]);

  return (
    <Card
      className={`shadow border ${
        theme === "light"
          ? "bg-white text-gray-800 border-gray-200"
          : "bg-gray-800 text-gray-200 border-gray-600"
      }`}
    >
      <CardHeader>
        <CardTitle>Sanal Saat</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg font-semibold text-center">{time}</p>
      </CardContent>
      <CardFooter className="flex gap-4 justify-center">
        <Button
          variant={theme === "light" ? "default" : "secondary"}
          onClick={startClock}
        >
          Başlat
        </Button>
        <Button variant="destructive" onClick={stopClock}>
          Durdur
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ClockCard;
