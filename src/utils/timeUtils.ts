/**
 * Time utility functions for determining time blocks
 */

import { TimeOfDay } from "@/types/habit";

/**
 * Determine time of day based on alarm time
 * Morning: 5:00 AM – 11:59 AM
 * Afternoon: 12:00 PM – 5:59 PM
 * Night: 6:00 PM – 4:59 AM
 */
export const getTimeOfDay = (alarmTime: string): TimeOfDay => {
  const [hours, minutes] = alarmTime.split(":").map(Number);
  const totalMinutes = hours * 60 + minutes;

  // Morning: 5:00 AM (300 min) – 11:59 AM (719 min)
  if (totalMinutes >= 300 && totalMinutes <= 719) {
    return "morning";
  }

  // Afternoon: 12:00 PM (720 min) – 5:59 PM (1079 min)
  if (totalMinutes >= 720 && totalMinutes <= 1079) {
    return "afternoon";
  }

  // Night: 6:00 PM (1080 min) – 4:59 AM (299 min)
  // This includes 6:00 PM - 11:59 PM and 12:00 AM - 4:59 AM
  return "night";
};

/**
 * Format time for display (convert 24h to 12h format)
 */
export const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(":");
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? "pm" : "am";
  const displayHour = hour % 12 || 12;
  return `${displayHour.toString().padStart(2, "0")}:${minutes} ${ampm}`;
};
