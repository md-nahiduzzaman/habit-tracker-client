import { useState } from "react";

/**
 * Custom hook for managing collapsible sections state
 */
export function useCollapsibleSections() {
  const [collapsedSections, setCollapsedSections] = useState<
    Record<string, boolean>
  >({});

  /**
   * Toggle a section's collapsed state
   */
  const toggleSection = (section: string) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  /**
   * Check if a section is collapsed
   */
  const isCollapsed = (section: string): boolean => {
    return collapsedSections[section] || false;
  };

  return {
    toggleSection,
    isCollapsed,
  };
}
