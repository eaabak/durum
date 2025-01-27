import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Bell } from "lucide-react";
import { useNotification } from "../stores/useNotification";

export function NotificationDropdown() {
  const { getNotificationCount, notifications, markAsRead } = useNotification();
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleNotificationClick = () => {
    setNotificationOpen((prev) => !prev);
  };

  const handleNotificationRead = (id: number) => {
    markAsRead(id);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setNotificationOpen(false);
      }
    };

    if (isNotificationOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isNotificationOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="icon"
        className="relative h-8 w-8 px-0"
        onClick={handleNotificationClick}
      >
        <Bell className="h-5 w-5" />
        {getNotificationCount() > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center h-4 w-4 rounded-full bg-red-600 text-white text-xs font-semibold shadow-lg">
            {getNotificationCount()}
          </span>
        )}
        <span className="sr-only">Notifications</span>
      </Button>

      {isNotificationOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200 z-50 animate-slide-down">
          {notifications.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {notifications.map((notification) => (
                <li
                  key={notification.id}
                  className={`p-4 flex justify-between items-start gap-3 cursor-pointer ${
                    notification.read
                      ? "bg-white text-gray-500"
                      : "bg-gray-50 text-gray-800 shadow-sm"
                  } hover:bg-blue-100 transition-colors duration-200`}
                  onClick={() => handleNotificationRead(notification.id)}
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium">{notification.text}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(notification.id).toLocaleTimeString()}
                    </p>
                  </div>
                  {!notification.read && (
                    <span className="inline-flex h-3 w-3 rounded-full bg-blue-500"></span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-6 text-center text-gray-500 text-sm">
              No notifications 🎉
            </div>
          )}
        </div>
      )}
    </div>
  );
}
