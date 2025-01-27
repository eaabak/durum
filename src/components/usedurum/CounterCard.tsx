import { Minus, Plus } from "lucide-react";
import useCounterStore from "../../stores/useCounter";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useTheme } from "../../stores/useTheme";

const CounterCard: React.FC = () => {
  const { count, increment, decrement, reset } = useCounterStore();
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
        <CardTitle>Sayacı Yönet</CardTitle>
        <CardDescription>Store kullanarak sayaç örneği.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-lg font-semibold">Mevcut Değer: {count}</p>
      </CardContent>
      <CardFooter className="flex gap-4">
        <Button
          className={
            theme === "light"
              ? ""
              : "bg-gray-600 hover:bg-gray-500 text-gray-100"
          }
          onClick={increment}
        >
          <Plus />
        </Button>
        <Button
          className={
            theme === "light"
              ? ""
              : "bg-gray-600 hover:bg-gray-500 text-gray-100"
          }
          onClick={decrement}
        >
          <Minus />
        </Button>
        <Button variant={"secondary"} onClick={reset}>
          Sıfırla
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CounterCard;
