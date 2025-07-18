export interface Habit {
  id: string;
  name: string;
  color: string;
  timeOfDay: "morning" | "evening" | "night";
  createdAt: string;
  completions: Record<string, boolean>; // date string -> completion status
}

export type TimeOfDay = "morning" | "evening" | "night";

export interface HabitStats {
  success: number;
  failed: number;
  total: number;
}
