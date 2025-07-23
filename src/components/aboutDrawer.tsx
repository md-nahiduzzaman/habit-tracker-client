import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { ArrowLeft } from "lucide-react";

interface AboutDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * About page drawer with app information, version, and credits
 */
export default function AboutDrawer({ isOpen, onClose }: AboutDrawerProps) {
  const currentYear = new Date().getFullYear();
  const appVersion = "1.0.0";

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent
        className="h-full text-white border-none"
        style={{ backgroundColor: "#1D1D1D" }}
      >
        <div className="h-full flex flex-col">
          {/* Header with back arrow */}
          <div className="flex items-center p-6">
            <button
              onClick={onClose}
              className="w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center hover:bg-gray-800 transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Centered content */}
          <div className="flex-1 flex items-center justify-center px-6">
            <p className="text-gray-300 text-sm leading-relaxed">
              Habit Tracker v{appVersion}. © {currentYear} Habit Tracker App.
              For support, contact support@habittracker.app
            </p>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
