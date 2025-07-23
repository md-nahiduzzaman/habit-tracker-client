import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TimeOfDay } from "@/types/habit";
import { formatHabitName } from "@/utils/stringUtils";
import { getTimeOfDay } from "@/utils/timeUtils";

interface AddHabitDialogProps {
  isOpen: boolean;
  onClose: () => void;
  habitName: string;
  alarmTime: string;
  onNameChange: (name: string) => void;
  onAlarmTimeChange: (time: string) => void;
  onSubmit: () => void;
}

/**
 * Dialog for adding new habits with alarm/notification time
 */
export default function AddHabitDialog({
  isOpen,
  onClose,
  habitName,
  alarmTime,
  onNameChange,
  onAlarmTimeChange,
  onSubmit,
}: AddHabitDialogProps) {
  // Auto-determine time of day based on alarm time
  const timeOfDay = getTimeOfDay(alarmTime);

  /**
   * Handle form submission
   */
  const handleSubmit = () => {
    const formattedName = formatHabitName(habitName);
    if (formattedName && alarmTime) {
      onSubmit();
    }
  };

  /**
   * Handle Enter key press for quick submission
   */
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  /**
   * Handle habit name change with auto-capitalization
   */
  const handleNameChange = (value: string) => {
    const formatted = formatHabitName(value);
    onNameChange(formatted);
  };

  /**
   * Capitalize first letter of time of day for display
   */
  const formatTimeOfDay = (time: TimeOfDay): string => {
    return time.charAt(0).toUpperCase() + time.slice(1);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-sm mx-auto border-gray-700 text-white"
        style={{ backgroundColor: "#262626" }}
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-medium text-white">
            Add New Habit
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Habit name input */}
          <div className="space-y-2">
            <Label htmlFor="habit-name" className="text-gray-300 text-sm">
              Habit Name
            </Label>
            <Input
              id="habit-name"
              placeholder="e.g., Reading, Exercise, Meditation"
              value={habitName}
              onChange={(e) => handleNameChange(e.target.value)}
              onKeyPress={handleKeyPress}
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-green-500"
            />
          </div>

          {/* Alarm/Notification time */}
          <div className="space-y-2">
            <Label htmlFor="alarm-time" className="text-gray-300 text-sm">
              Alarm/Notification Time
            </Label>
            <Input
              id="alarm-time"
              type="time"
              value={alarmTime}
              onChange={(e) => onAlarmTimeChange(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white focus:border-green-500"
            />
            {/* Show auto-determined time of day */}
            {alarmTime && (
              <div className="text-sm text-gray-400">
                Time of day:{" "}
                <span className="text-green-400">
                  {formatTimeOfDay(timeOfDay)}
                </span>
              </div>
            )}
          </div>

          {/* Submit button */}
          <Button
            onClick={handleSubmit}
            disabled={!habitName.trim() || !alarmTime}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            Add Habit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
