"use client";

import DateAndStatus from "@/components/dateAndStatus";
import FloatingAddButton from "@/components/floatingAddButton";
import Header from "@/components/header";
import { useHabits } from "@/hooks/useHabits";
import { getCompletionRate } from "@/utils/habitUtils";
import { useState } from "react";

export default function HabitTracker() {
  // Habit management
  const { habits, addHabit, deleteHabit, updateHabit, toggleHabitCompletion } =
    useHabits();

  // dialog and drawer state
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  /**
   * Calculate completion rate for today
   */
  const completionRate = getCompletionRate(habits);

  return (
    <div className="min-h-screen max-w-md p-4 bg-amber-200 mx-auto">
      <div className="max-w-md mx-auto space-y-4">
        {/* header */}
        <Header />

        {/* Date and completion stats */}
        <DateAndStatus completionRate={completionRate} />

        {/* Floating add button */}
        <FloatingAddButton onClick={() => setIsAddDialogOpen(true)} />
      </div>
    </div>
  );
}
