import { useEffect, useRef } from "react";
import { Habit } from "@/types/habit";
import { formatDate } from "@/utils/dateUtils";

/**
 * Custom hook for managing habit notifications
 * Checks for notification times and shows browser notifications
 */
export function useNotifications(habits: Habit[]) {
  const notificationTimeouts = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    // Clear existing timeouts
    notificationTimeouts.current.forEach((timeout) => clearTimeout(timeout));
    notificationTimeouts.current = [];

    // Request notification permission
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }

    // Set up notifications for each habit
    habits.forEach((habit) => {
      const today = formatDate(new Date());
      const isCompleted = habit.completions[today];

      // Only set notification for incomplete habits
      if (!isCompleted) {
        scheduleNotification(habit);
      }
    });

    // Cleanup function
    return () => {
      notificationTimeouts.current.forEach((timeout) => clearTimeout(timeout));
    };
  }, [habits]);

  /**
   * Schedule a notification for a specific habit
   */
  const scheduleNotification = (habit: Habit) => {
    const now = new Date();
    const [hours, minutes] = habit.alarmTime.split(":").map(Number);

    // Create notification time for today
    const notificationTime = new Date();
    notificationTime.setHours(hours, minutes, 0, 0);

    // If the time has passed today, schedule for tomorrow
    if (notificationTime <= now) {
      notificationTime.setDate(notificationTime.getDate() + 1);
    }

    const timeUntilNotification = notificationTime.getTime() - now.getTime();

    // Schedule the notification
    const timeout = setTimeout(() => {
      showNotification(habit);
    }, timeUntilNotification);

    notificationTimeouts.current.push(timeout);
  };

  /**
   * Show browser notification for a habit
   */
  const showNotification = (habit: Habit) => {
    if ("Notification" in window && Notification.permission === "granted") {
      const notification = new Notification(`Time for ${habit.name}! 🔥`, {
        body: `Don't break your streak! Complete your ${habit.timeOfDay} habit now.`,
        icon: "/favicon.ico", // You can add a custom icon
        badge: "/favicon.ico",
        tag: habit.id, // Prevents duplicate notifications
        requireInteraction: true, // Keeps notification visible until user interacts
      });

      // Auto-close notification after 10 seconds
      setTimeout(() => {
        notification.close();
      }, 10000);

      // Handle notification click
      notification.onclick = () => {
        window.focus(); // Focus the app window
        notification.close();
      };
    }
  };

  return {
    scheduleNotification,
    showNotification,
  };
}
