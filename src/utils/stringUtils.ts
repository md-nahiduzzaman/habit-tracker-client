/**
 * String utility functions for text formatting and manipulation
 */

/**
 * Capitalize the first letter of each word in a string
 * @param text - The text to capitalize
 * @returns Capitalized text with first letter of each word uppercase
 */
export const capitalizeWords = (text: string): string => {
  return text
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

/**
 * Format text for display with proper capitalization
 * @param text - Raw text input
 * @returns Formatted text ready for display
 */
export const formatHabitName = (text: string): string => {
  return capitalizeWords(text.trim());
};
