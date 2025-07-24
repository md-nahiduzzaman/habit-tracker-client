import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Habit } from "@/types/habit";
import { getStreakCount, getHabitStats } from "@/utils/habitUtils";
// import { formatDate } from "@/utils/dateUtils";
// import { useState } from "react";

interface HabitDetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  habit: Habit | null;
  onEdit: (habit: Habit) => void;
  onDelete: (habitId: string) => void;
  onToggleCompletion: (habitId: string, date: string) => void;
}

/**
 * Full-screen drawer showing detailed habit information and calendar
 */
export default function HabitDetailsDrawer({
  isOpen,
  onClose,
  habit,
  onEdit,
  onDelete,
}: HabitDetailsDrawerProps) {
  if (!habit) return null;

  const streak = getStreakCount(habit);
  const stats = getHabitStats(habit);
  const completionRate = Math.round(
    (stats.success / Math.max(stats.total, 1)) * 100
  );
  // const today = formatDate(new Date());

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent
        className="h-full text-white border-none"
        style={{ backgroundColor: "#1D1D1D" }}
      >
        <div className="h-full flex flex-col">
          {/* Header with back button and menu */}
          <div className="flex items-center justify-between p-6">
            <button
              onClick={onClose}
              className="w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center hover:bg-gray-800 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Three dots menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center hover:bg-gray-800 transition-colors">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                  </svg>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-800 border-gray-700">
                <DropdownMenuItem
                  onClick={() => {
                    onEdit(habit);
                    onClose();
                  }}
                  className="text-white hover:bg-gray-700"
                >
                  Edit Habit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    onDelete(habit.id);
                    onClose();
                  }}
                  className="text-red-400 hover:bg-gray-700"
                >
                  Delete Habit
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Habit details */}
          <DrawerHeader className="text-center pb-8">
            <DrawerTitle className="text-3xl font-light text-white mb-8">
              {habit.name}
            </DrawerTitle>

            {/* Current streak */}
            <div className="mb-6">
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="text-yellow-500 text-2xl">🔥</div>
                <span className="text-gray-400 text-sm uppercase tracking-wider">
                  CURRENT STREAK
                </span>
              </div>
              <div className="text-5xl font-light text-white">
                {streak} Days
              </div>
            </div>

            {/* Stats row */}
            <div className="flex justify-center gap-8 mb-8">
              <div className="text-center">
                <div className="text-gray-400 text-sm uppercase tracking-wider mb-1">
                  {completionRate}% COMPLETION RATE
                </div>
              </div>
              <div className="text-center">
                <div className="text-gray-400 text-sm uppercase tracking-wider mb-1">
                  {stats.total} DAYS LONG
                </div>
              </div>
            </div>
          </DrawerHeader>

          {/* Success and Failed stats */}
          <div className="px-6 mb-8">
            <div className="grid grid-cols-2 gap-4">
              <div
                className="p-6 rounded-2xl"
                style={{ backgroundColor: "#262626" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-green-400">✓</span>
                  <span className="text-gray-400 text-sm uppercase tracking-wider">
                    SUCCESS
                  </span>
                </div>
                <div className="text-3xl font-light text-white">
                  {stats.success} Days
                </div>
              </div>

              <div
                className="p-6 rounded-2xl"
                style={{ backgroundColor: "#262626" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-red-400">✕</span>
                  <span className="text-gray-400 text-sm uppercase tracking-wider">
                    FAILED
                  </span>
                </div>
                <div className="text-3xl font-light text-white">
                  {stats.failed} Days
                </div>
              </div>
            </div>
          </div>

          {/* Calendar */}
          <div className="flex-1 px-6 pb-6">
            {/* Calendar header */}
            {/* <div className="flex items-center justify-between mb-6">
              <button
                onClick={goToPreviousMonth}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <h3 className="text-xl font-medium text-white">
                {currentMonth.toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </h3>

              <button
                onClick={goToNextMonth}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div> */}

            {/* Calendar day headers */}
            {/* <div className="grid grid-cols-7 gap-1 mb-4">
              {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
                <div
                  key={day}
                  className="text-center text-gray-500 text-xs font-medium py-2"
                >
                  {day}
                </div>
              ))}
            </div> */}

            {/* Calendar grid */}
            {/* <div className="grid grid-cols-7 gap-1">
              {getCalendarDays(currentMonth).map((date, index) => {
                const dateString = formatDate(date);
                const isCompleted = habit.completions[dateString];
                const isToday = dateString === today;
                const isCurrentMonth =
                  date.getMonth() === currentMonth.getMonth();

                return (
                  <button
                    key={index}
                    onClick={() => onToggleCompletion(habit.id, dateString)}
                    className={`
                      w-10 h-10 rounded-full text-sm font-medium transition-all
                      ${isCurrentMonth ? "text-white" : "text-gray-600"}
                      ${
                        isCompleted && isCurrentMonth
                          ? "bg-yellow-500 text-black"
                          : ""
                      }
                      ${isToday && !isCompleted ? "ring-2 ring-yellow-500" : ""}
                      ${isCurrentMonth ? "hover:bg-gray-700" : ""}
                    `}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div> */}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
