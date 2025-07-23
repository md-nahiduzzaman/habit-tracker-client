import { useEffect } from "react";
import { Habit } from "@/types/habit";
import { formatDate } from "@/utils/dateUtils";

/**
 * Custom hook for tracking habit failures
 * Automatically marks incomplete habits as failed when a day passes
 */
export function useFailureTracking(
  habits: Habit[],
  updateHabit: (id: string, updates: Partial<Habit>) => void
) {
  useEffect(() => {
    // Check for failures on app load and when habits change
    checkAndMarkFailures();

    // Set up daily check at midnight
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const timeUntilMidnight = tomorrow.getTime() - now.getTime();

    // Initial timeout to midnight
    const midnightTimeout = setTimeout(() => {
      checkAndMarkFailures();

      // Then check every 24 hours
      const dailyInterval = setInterval(
        checkAndMarkFailures,
        24 * 60 * 60 * 1000
      );

      return () => clearInterval(dailyInterval);
    }, timeUntilMidnight);

    return () => clearTimeout(midnightTimeout);
  }, [habits]);

  /**
   * Check all habits and mark incomplete ones as failed for past dates
   */
  const checkAndMarkFailures = () => {
    const today = new Date();
    const todayString = formatDate(today);

    console.log(todayString);

    habits.forEach((habit) => {
      const habitCreatedDate = new Date(habit.createdAt);
      const updatedCompletions = { ...habit.completions };
      let hasUpdates = false;

      // Check each day from habit creation to yesterday
      const currentDate = new Date(habitCreatedDate);

      while (currentDate < today) {
        const dateString = formatDate(currentDate);

        // If this date doesn't exist in completions, mark as failed
        if (!(dateString in updatedCompletions)) {
          updatedCompletions[dateString] = false;
          hasUpdates = true;
        }

        // Move to next day
        currentDate.setDate(currentDate.getDate() + 1);
      }

      // Update habit if there were changes
      if (hasUpdates) {
        updateHabit(habit.id, { completions: updatedCompletions });
      }
    });
  };

  /**
   * Get failure statistics for a habit
   */
  const getFailureStats = (habit: Habit) => {
    const completions = Object.entries(habit.completions);
    const failedDays = completions.filter(
      ([, completed]) => completed === false
    ).length;
    const successDays = completions.filter(
      ([, completed]) => completed === true
    ).length;
    const totalDays = completions.length;

    return {
      failed: failedDays,
      success: successDays,
      total: totalDays,
      failureRate:
        totalDays > 0 ? Math.round((failedDays / totalDays) * 100) : 0,
    };
  };

  return {
    checkAndMarkFailures,
    getFailureStats,
  };
}
