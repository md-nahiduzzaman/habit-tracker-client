import { Menu } from "lucide-react";

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
      <h1 className="text-white text-2xl tracking-wide font-black">
        Suluk <span className="text-gray-400 font-light">- Habit Tracker</span>
      </h1>

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
