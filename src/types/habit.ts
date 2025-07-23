// Type definitions for the habit tracker application

export interface Habit {
  id: string;
  name: string;
  timeOfDay: "morning" | "afternoon" | "night";
  alarmTime: string; // Format: "HH:MM"
  createdAt: string;
  completions: Record<string, boolean>; // date string -> completion status
}

export type TimeOfDay = "morning" | "afternoon" | "night";

export interface HabitStats {
  success: number;
  failed: number;
  total: number;
  successRate: number;
  failureRate: number;
}
