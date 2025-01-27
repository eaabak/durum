import { create } from "../library/src";

interface Notification {
  id: number;
  text: string;
  length: number;
  sent: boolean;
  read: boolean;
}

interface NotificationState {
  message: string;
  notifications: Notification[];
  setMessage: (text: string) => void;
  addNotification: () => void;
  clearNotifications: () => void;
  getNotificationCount: () => number;
  markAsRead: (id: number) => void;
}

export const useNotification = create<NotificationState>(
  (set, get) => ({
    message: "",
    notifications: [],
    setMessage: (text) => set(() => ({ message: text })),
    addNotification: () => {
      const { message, notifications } = get();

      if (message.trim() === "") return;

      const newNotification: Notification = {
        id: Date.now(),
        text: message,
        length: message.length,
        sent: true,
        read: false,
      };

      set(() => ({
        notifications: [newNotification, ...notifications],
        message: "",
      }));
    },
    clearNotifications: () => set(() => ({ notifications: [] })),
    getNotificationCount: () => {
      const { notifications } = get();
      // Sadece okunmamış bildirimleri say
      return notifications.filter((notification) => !notification.read).length;
    },
    markAsRead: (id: number) => {
      const { notifications } = get();

      const updatedNotifications = notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      );

      set(() => ({ notifications: updatedNotifications }));
    },
  }),
  [],
  "NotificationStore"
);
