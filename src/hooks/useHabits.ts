import { Habit, TimeOfDay } from "@/types/habit";
import { useEffect, useState } from "react";

/**
 * Custom hook for managing habits state and localStorage persistence
 */
export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>([]);

  // Load habits from localStorage on mount
  useEffect(() => {
    const savedHabits = localStorage.getItem("habits");
    if (savedHabits) {
      setHabits(JSON.parse(savedHabits));
    }
  }, []);

  // Save habits to localStorage whenever habits change
  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  /**
   * Add a new habit
   */
  const addHabit = (name: string, color: string, timeOfDay: TimeOfDay) => {
    const newHabit: Habit = {
      id: Date.now().toString(),
      name: name.trim(),
      color,
      timeOfDay,
      createdAt: new Date().toISOString(),
      completions: {},
    };
    setHabits((prev) => [...prev, newHabit]);
  };

  /**
   * Delete a habit
   */
  const deleteHabit = (id: string) => {
    setHabits((prev) => prev.filter((habit) => habit.id !== id));
  };

  /**
   * Update a habit
   */
  const updateHabit = (id: string, updates: Partial<Habit>) => {
    setHabits((prev) =>
      prev.map((habit) => (habit.id === id ? { ...habit, ...updates } : habit))
    );
  };

  /**
   * Toggle habit completion for a specific date
   */
  const toggleHabitCompletion = (habitId: string, date: string) => {
    setHabits((prev) =>
      prev.map((habit) => {
        if (habit.id === habitId) {
          const completions = { ...habit.completions };
          completions[date] = !completions[date];
          return { ...habit, completions };
        }
        return habit;
      })
    );
  };

  return {
    habits,
    addHabit,
    deleteHabit,
    updateHabit,
    toggleHabitCompletion,
  };
}
