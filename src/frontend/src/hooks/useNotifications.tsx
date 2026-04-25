import { useCallback, useState } from "react";

type PermissionState = "default" | "granted" | "denied";

/**
 * Wrapper around the browser Notification API.
 * Gracefully handles missing support.
 */
export function useNotifications() {
  const isSupported = typeof window !== "undefined" && "Notification" in window;

  const [permission, setPermission] = useState<PermissionState>(() => {
    if (!isSupported) return "denied";
    return Notification.permission as PermissionState;
  });

  const requestPermission = useCallback(async (): Promise<boolean> => {
    if (!isSupported) return false;
    if (Notification.permission === "granted") {
      setPermission("granted");
      return true;
    }
    try {
      const result = await Notification.requestPermission();
      setPermission(result as PermissionState);
      return result === "granted";
    } catch {
      return false;
    }
  }, [isSupported]);

  const sendNotification = useCallback(
    (title: string, options?: NotificationOptions): boolean => {
      if (!isSupported || Notification.permission !== "granted") return false;
      try {
        new Notification(title, {
          icon: "/favicon.ico",
          badge: "/favicon.ico",
          ...options,
        });
        return true;
      } catch {
        return false;
      }
    },
    [isSupported],
  );

  const scheduleMealReminder = useCallback(
    (mealType: string, time: Date) => {
      const delay = time.getTime() - Date.now();
      if (delay <= 0) return;
      setTimeout(() => {
        sendNotification(`Time for ${mealType}! 🍽️`, {
          body: "Open Tastee to get your personalized food recommendation.",
          tag: `meal-reminder-${mealType}`,
        });
      }, delay);
    },
    [sendNotification],
  );

  return {
    isSupported,
    permission,
    requestPermission,
    sendNotification,
    scheduleMealReminder,
  };
}
