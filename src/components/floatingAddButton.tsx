import { Plus } from "lucide-react";

interface FloatingAddButtonProps {
  onClick: () => void;
}

export default function FloatingAddButton({ onClick }: FloatingAddButtonProps) {
  return (
    <div className="fixed bottom-4 right-4">
      <button
        className="bg-blue-600 text-white p-4 rounded-full shadow-lg"
        onClick={onClick}
      >
        <Plus className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}
