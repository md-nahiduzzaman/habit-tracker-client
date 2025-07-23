import { Menu, Bell } from "lucide-react";
import { formatCurrentDate } from "@/utils/dateUtils";

interface HeaderProps {
  onMenuClick: () => void;
}

/**
 * App header with title and hamburger menu
 */
export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6 px-1">
      {/* Left side - App Title */}
      <h1 className="text-white text-xl font-medium">Habit Tracker</h1>

      {/* Right side - Hamburger menu */}
      <button
        onClick={onMenuClick}
        className="w-10 h-10 flex items-center justify-center hover:bg-gray-800 rounded-lg transition-colors"
      >
        <Menu className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}
