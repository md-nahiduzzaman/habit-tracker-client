"use client";

import { useState } from "react";

// Components
import Header from "@/components/header";
import AboutDrawer from "@/components/aboutDrawer";
import WeeklyCalendar from "@/components/weeklyCalendar";
import HabitCard from "@/components/habitCard";
import FloatingAddButton from "@/components/floatingAddButton";
import AddHabitDialog from "@/components/addHabitDialog";
import HabitDetailsDrawer from "@/components/habitDetailsDrawer";

// Hooks
import { useHabits } from "@/hooks/useHabits";
import { useFailureTracking } from "@/hooks/useFailureTracking";

// Utils and constants
import { formatDate } from "@/utils/dateUtils";
import { Habit } from "@/types/habit";

/**
 * Main habit tracker application component
 * Features: Habit management, completion tracking, auto-updates, and failure tracking
 */
export default function HabitTracker() {
  // Habit management hook
  const { habits, addHabit, deleteHabit, updateHabit, toggleHabitCompletion } =
    useHabits();

  // Automatic failure tracking
  useFailureTracking(habits, updateHabit);

  // Dialog and drawer state management
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isAboutDrawerOpen, setIsAboutDrawerOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  console.log(editingHabit);

  // New habit form state
  const [newHabitName, setNewHabitName] = useState("");
  const [newAlarmTime, setNewAlarmTime] = useState("07:00");

  // Get today's date for filtering
  const today = formatDate(new Date());

  // Separate habits into incomplete and complete
  const incompleteHabits = habits.filter((habit) => !habit.completions[today]);
  const completedHabits = habits.filter((habit) => habit.completions[today]);

  /**
   * Handle adding a new habit
   */
  const handleAddHabit = () => {
    if (newHabitName.trim()) {
      addHabit(newHabitName, newAlarmTime);
      // Reset form
      setNewHabitName("");
      setNewAlarmTime("07:00");
      setIsAddDialogOpen(false);
    }
  };

  /**
   * Handle editing a habit
   */
  const handleUpdateHabit = (id: string, updates: Partial<Habit>) => {
    updateHabit(id, updates);
    setEditingHabit(null);
  };

  console.log(handleUpdateHabit);

  /**
   * Navigate to habit details
   */
  const navigateToHabitDetails = (habitId: string) => {
    const habit = habits.find((h) => h.id === habitId);
    if (habit) {
      setSelectedHabit(habit);
      setIsDrawerOpen(true);
    }
  };

  return (
    <div
      className="min-h-screen text-white"
      style={{ backgroundColor: "#1D1D1D" }}
    >
      <div className="max-w-md mx-auto px-4 py-6">
        {/* App header with title and hamburger menu */}
        <Header onMenuClick={() => setIsAboutDrawerOpen(true)} />

        {/* Weekly calendar */}
        <WeeklyCalendar />

        {/* Habits to Complete Section */}
        {incompleteHabits.length > 0 && (
          <div className="mb-8">
            {/* Section header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-light text-white mb-1">Habit</h2>
                <h2 className="text-2xl font-light text-white">to Complete</h2>
              </div>
              <div className="bg-yellow-500 text-black text-lg font-semibold w-8 h-8 rounded-full flex items-center justify-center">
                {incompleteHabits.length}
              </div>
            </div>

            {/* Incomplete habit cards */}
            <div className="space-y-0">
              {incompleteHabits.map((habit) => (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  onToggleCompletion={toggleHabitCompletion}
                  onViewDetails={navigateToHabitDetails}
                  isCompleted={false}
                />
              ))}
            </div>
          </div>
        )}

        {/* Completed Habits Section */}
        {completedHabits.length > 0 && (
          <div className="mb-8">
            {/* Section header */}
            <h2 className="text-2xl font-light text-white mb-6">Complete</h2>

            {/* Completed habit cards */}
            <div className="space-y-0">
              {completedHabits.map((habit) => (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  onToggleCompletion={toggleHabitCompletion}
                  onViewDetails={navigateToHabitDetails}
                  isCompleted={true}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {habits.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4 text-lg">No habits yet</div>
            <button
              onClick={() => setIsAddDialogOpen(true)}
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-full font-medium transition-colors"
            >
              Add Your First Habit
            </button>
          </div>
        )}

        {/* Bottom padding for floating button */}
        <div className="h-20"></div>
      </div>

      {/* Floating add button */}
      <FloatingAddButton onClick={() => setIsAddDialogOpen(true)} />

      {/* Add habit dialog */}
      <AddHabitDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        habitName={newHabitName}
        alarmTime={newAlarmTime}
        onNameChange={setNewHabitName}
        onAlarmTimeChange={setNewAlarmTime}
        onSubmit={handleAddHabit}
      />

      {/* Habit details drawer */}
      <HabitDetailsDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        habit={selectedHabit}
        onEdit={setEditingHabit}
        onDelete={deleteHabit}
        onToggleCompletion={toggleHabitCompletion}
      />

      {/* About drawer */}
      <AboutDrawer
        isOpen={isAboutDrawerOpen}
        onClose={() => setIsAboutDrawerOpen(false)}
      />
    </div>
  );
}
