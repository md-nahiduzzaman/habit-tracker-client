import { ChevronRight } from "lucide-react";
import { Habit } from "@/types/habit";
import { getStreakCount } from "@/utils/habitUtils";
import { formatDate } from "@/utils/dateUtils";
import { formatTime } from "@/utils/timeUtils";

interface HabitCardProps {
  habit: Habit;
  onToggleCompletion: (habitId: string, date: string) => void;
  onViewDetails: (habitId: string) => void;
  isCompleted?: boolean;
}

/**
 * Individual habit card component with time indicator and streak
 * Shows habit name, streak, time of day, and completion status
 */
export default function HabitCard({
  habit,
  onToggleCompletion,
  onViewDetails,
  isCompleted = false,
}: HabitCardProps) {
  const today = formatDate(new Date());
  const completed = isCompleted || habit.completions[today];
  const streak = getStreakCount(habit);

  /**
   * Get time color based on time of day
   */
  const getTimeColor = () => {
    switch (habit.timeOfDay) {
      case "morning":
        return "bg-red-500";
      case "afternoon":
        return "bg-green-500";
      case "night":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div
      className="flex items-center justify-between p-4 rounded-full mb-3"
      style={{ backgroundColor: "#262626" }}
    >
      {/* Left side - Checkbox and habit details */}
      <div className="flex items-center gap-4 flex-1">
        {/* Checkbox */}
        <button
          onClick={() => onToggleCompletion(habit.id, today)}
          className={`w-6 h-6 rounded-full border-2 transition-colors flex items-center justify-center ${
            completed
              ? "bg-green-500 border-green-500"
              : "border-gray-500 hover:border-white"
          }`}
        >
          {completed && (
            <svg
              className="w-3 h-3 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>

        {/* Habit details */}
        <div className="flex-1">
          <div
            className={`text-white text-lg font-medium mb-1 ${
              completed ? "line-through" : ""
            }`}
          >
            {habit.name}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-yellow-500 text-sm">
              🔥 {streak} day streak
            </span>
          </div>
        </div>
      </div>

      {/* Right side - Time indicator and arrow */}
      <div className="flex items-center gap-3">
        {/* Time indicator */}
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${getTimeColor()}`}></div>
          <span className="text-gray-400 text-sm capitalize">
            {habit.timeOfDay}
          </span>
          <span className="text-gray-500 text-sm">
            {formatTime(habit.alarmTime)}
          </span>
        </div>

        {/* Arrow button */}
        <button
          onClick={() => onViewDetails(habit.id)}
          className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors"
        >
          <ChevronRight className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
}
