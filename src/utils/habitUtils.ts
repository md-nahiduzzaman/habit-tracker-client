import { Habit } from "@/types/habit";
import { formatDate } from "./dateUtils";

/**
 * Calculate current streak for a habit
 */
export const getStreakCount = (habit: Habit): number => {
  const today = new Date();
  let streak = 0;
  let currentDate = new Date(today);

  while (true) {
    const dateString = formatDate(currentDate);
    if (habit.completions[dateString]) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
};

/**
 * Get habit statistics (success, failed, total days)
 */

/**
 * Calculate overall completion rate for today
 */

export const getCompletionRate = (habits: Habit[]): number => {
  if (habits.length === 0) return 0;
  const today = formatDate(new Date());
  const completedToday = habits.filter(
    (habit) => habit.completions[today]
  ).length;
  return Math.round((completedToday / habits.length) * 100);
};
