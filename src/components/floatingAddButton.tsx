import { Plus } from "lucide-react";

interface FloatingAddButtonProps {
  onClick: () => void;
}

/**
 * Floating action button for adding new habits
 */
export default function FloatingAddButton({ onClick }: FloatingAddButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-1/2 transform translate-x-1/2 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all z-50"
      style={{
        background: "linear-gradient(135deg, #00E8B4 0%, #44F96E 100%)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translate(50%, 0) scale(1.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translate(50%, 0) scale(1)";
      }}
    >
      <Plus className="w-6 h-6 text-white" />
    </button>
  );
}
