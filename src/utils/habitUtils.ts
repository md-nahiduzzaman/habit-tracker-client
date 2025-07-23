import { Habit, HabitStats } from "@/types/habit";
import { formatDate } from "./dateUtils";

/**
 * Calculate current streak for a habit
 * Only counts consecutive completed days, breaks on any failed day
 */
export const getStreakCount = (habit: Habit): number => {
  const today = new Date();
  let streak = 0;
  let currentDate = new Date(today);

  while (true) {
    const dateString = formatDate(currentDate);
    const completion = habit.completions[dateString];

    // If day is completed, continue streak
    if (completion === true) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
      // If day is explicitly failed or doesn't exist (for past dates), break streak
    } else if (
      completion === false ||
      (dateString in habit.completions && completion !== true)
    ) {
      break;
      // For future dates or dates before habit creation, break streak
    } else {
      break;
    }
  }

  return streak;
};

/**
 * Get comprehensive habit statistics including failures
 */
export const getHabitStats = (habit: Habit): HabitStats => {
  const completions = Object.entries(habit.completions);
  const successDays = completions.filter(([_, completed]) => completed).length;
  const failedDays = completions.filter(([_, completed]) => !completed).length;
  const totalDays = completions.length;

  return {
    success: successDays,
    failed: failedDays,
    total: totalDays,
    successRate:
      totalDays > 0 ? Math.round((successDays / totalDays) * 100) : 0,
    failureRate: totalDays > 0 ? Math.round((failedDays / totalDays) * 100) : 0,
  };
};

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

/**
 * Get the total number of days a habit has been tracked
 */
export const getTotalTrackedDays = (habit: Habit): number => {
  const createdDate = new Date(habit.createdAt);
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - createdDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};
