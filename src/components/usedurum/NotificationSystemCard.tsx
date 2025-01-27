import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useTheme } from "../../stores/useTheme";
import { useNotification } from "../../stores/useNotification";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CheckCheck } from "lucide-react";

const NotificationSystemCard: React.FC = () => {
  const { theme } = useTheme();
  const {
    message,
    notifications,
    getNotificationCount,
    setMessage,
    addNotification,
    clearNotifications,
  } = useNotification();

  const isLightTheme = theme === "light";

  console.log("getNotificationCount", getNotificationCount());

  return (
    <Card
      className={`shadow border transition-all duration-500 ${
        isLightTheme
          ? "bg-white text-gray-900 border-gray-200"
          : "bg-gray-800 text-gray-100 border-gray-600"
      }`}
    >
      <CardHeader className="p-6">
        <CardTitle className="text-xl font-bold">Bildirim Sistemi</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex gap-4 items-center mb-6">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Mesajınızı yazın..."
            className={`rounded-md px-4 py-2 flex-1 transition-colors duration-300 ${
              isLightTheme
                ? "bg-gray-100 text-gray-800 placeholder-gray-500"
                : "bg-gray-700 text-gray-200 placeholder-gray-400"
            }`}
          />
          <Button
            variant={isLightTheme ? "default" : "secondary"}
            onClick={addNotification}
            className={`rounded-md px-4 py-2 font-medium shadow-md`}
          >
            Gönder
          </Button>
        </div>

        {notifications.length > 0 ? (
          <ul className="space-y-4">
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className={`p-4 rounded-lg shadow-sm transition-all duration-300 ${
                  isLightTheme
                    ? "bg-gray-50 text-gray-900"
                    : "bg-gray-700 text-gray-200"
                }`}
              >
                <p className="font-semibold">{notification.text}</p>
                <div className="text-sm text-gray-500 flex justify-between mt-2">
                  <span>Harf Sayısı: {notification.length}</span>

                  <span>
                    {notification.sent ? (
                      <span className="flex gap-2 items-center">
                        Gönderildi{" "}
                        <CheckCheck className="w-4 h-4 text-green-500" />
                      </span>
                    ) : (
                      "Gönderiliyor..."
                    )}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p
            className={`text-center text-sm ${
              isLightTheme ? "text-gray-500" : "text-white"
            } italic`}
          >
            Henüz bir mesaj gönderilmedi.
          </p>
        )}
      </CardContent>
      <CardFooter className="p-6 flex justify-between items-center border-t">
        <p
          className={`text-center text-sm ${
            isLightTheme ? "text-gray-500" : "text-white"
          } italic`}
        >
          Toplam Bildirim: {notifications.length}
        </p>
        <Button
          variant="destructive"
          onClick={clearNotifications}
          className={`rounded-md px-4 py-2 text-sm font-medium shadow-md ${
            isLightTheme
              ? "bg-red-500 hover:bg-red-600 text-white"
              : "bg-red-600 hover:bg-red-700 text-white"
          }`}
        >
          Tümünü Temizle
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NotificationSystemCard;
