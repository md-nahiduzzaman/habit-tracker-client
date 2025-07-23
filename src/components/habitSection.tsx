import { ChevronUp, ChevronDown } from "lucide-react";
import { Habit, TimeOfDay } from "@/types/habit";
import { timeColors } from "@/constants/colors";
import HabitCard from "./habitCard";

interface HabitSectionProps {
  title: string;
  timeOfDay?: TimeOfDay | "complete";
  habits: Habit[];
  count?: number;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onToggleCompletion: (habitId: string, date: string) => void;
  onViewDetails: (habitId: string) => void;
}

/**
 * Collapsible section for grouping habits by time or completion status
 */
export default function HabitSection({
  title,
  timeOfDay,
  habits,
  count,
  isCollapsed,
  onToggleCollapse,
  onToggleCompletion,
  onViewDetails,
}: HabitSectionProps) {
  // Don't render section if no habits
  if (habits.length === 0) return null;

  // Get color for time indicator
  const getTimeColor = () => {
    if (!timeOfDay) return "bg-gray-500";
    return timeColors[timeOfDay] || "bg-gray-500";
  };

  return (
    <div className="mb-6">
      {/* Section header */}
      <button
        onClick={onToggleCollapse}
        className="flex items-center justify-between w-full mb-4"
      >
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${getTimeColor()}`}></div>
          <span className="text-lg font-medium">{title}</span>
          {count !== undefined && (
            <span className="bg-yellow-500 text-black text-sm px-2 py-1 rounded-full font-medium">
              {count}
            </span>
          )}
        </div>
        {isCollapsed ? (
          <ChevronDown className="w-5 h-5" />
        ) : (
          <ChevronUp className="w-5 h-5" />
        )}
      </button>

      {/* Habit cards */}
      {!isCollapsed && (
        <div className="space-y-3">
          {habits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              onToggleCompletion={onToggleCompletion}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      )}
    </div>
  );
}
