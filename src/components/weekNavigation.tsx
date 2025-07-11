"use client";
import { Button } from "./ui/button";

interface WeekNavigationProps {
  currentWeek: number;
  setCurrentWeek: (week: number) => void;
  weekDates: Date[];
  formatDate: (date: Date) => string;
  today: string;
}

export default function WeekNavigation(props: WeekNavigationProps) {
  const { currentWeek, setCurrentWeek, weekDates, formatDate, today } = props;

  return (
    <div>
      {/* week navigation */}
      {/* pervious */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setCurrentWeek(currentWeek - 1)}
      >
        Previous Week
      </Button>

      {/* current week */}
      <div>{currentWeek === 0 ? "This Week" : `Week ${currentWeek + 1}`}</div>

      {/* next */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setCurrentWeek(currentWeek + 1)}
      >
        Next Week
      </Button>

      {/* week days header  */}
      <div>
        <div className="grid grid-cols-7 gap-4 mt-4">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
            (day, index) => (
              <div key={day} className="text-center py-2">
                <div className="text-xs font-medium text-slate-600 mb-1">
                  {day}
                </div>
                <div
                  className={`text-sm font-semibold ${
                    formatDate(weekDates[index]) === today
                      ? "text-blue-600 bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mx-auto"
                      : "text-slate-800"
                  }`}
                >
                  {weekDates[index].getDate()}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
