import React from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useCart } from "../../stores/useCart";
import { useTheme } from "../../stores/useTheme";
import { Minus, Plus } from "lucide-react";

const Cart: React.FC = () => {
  const { items, addItem, removeItem, updateQuantity, clearCart } = useCart();
  const { theme } = useTheme();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Card
      className={`shadow border ${
        theme === "light"
          ? "bg-white text-gray-800 border-gray-200"
          : "bg-gray-800 text-gray-200 border-gray-600"
      }`}
    >
      <CardHeader>
        <CardTitle>Alışveriş Sepeti</CardTitle>
        <CardDescription>
          Sepetinizdeki ürünleri görüntüleyin ve yönetin.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <p className="font-semibold">Sepetiniz boş.</p>
        ) : (
          <ul className="space-y-2">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    {item.quantity} x ${item.price.toFixed(2)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    className={`${
                      theme === "light"
                        ? "bg-gray-200 hover:bg-gray-300 text-gray-900"
                        : "bg-gray-600 hover:bg-gray-500 text-gray-100"
                    }`}
                    onClick={() =>
                      updateQuantity(item.id, Math.max(1, item.quantity - 1))
                    }
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <Button
                    className={`${
                      theme === "light"
                        ? "bg-gray-200 hover:bg-gray-300 text-gray-900"
                        : "bg-gray-600 hover:bg-gray-500 text-gray-100"
                    }`}
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => removeItem(item.id)}
                  >
                    Kaldır
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <div className="flex justify-between font-semibold">
          <span>Toplam:</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <Button
          variant="secondary"
          className="w-full"
          onClick={() =>
            addItem({
              id: Date.now(),
              name: "Yeni Ürün",
              price: 20.99,
              quantity: 1,
            })
          }
        >
          Ürün Ekle
        </Button>
        <Button variant="destructive" className="w-full" onClick={clearCart}>
          Sepeti Temizle
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Cart;
