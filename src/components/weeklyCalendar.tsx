import { formatDate } from "@/utils/dateUtils";

/**
 * Weekly calendar component showing current week with today highlighted
 */
export default function WeeklyCalendar() {
  // Get current date and week
  const today = new Date();
  const currentWeek = getCurrentWeek(today);
  const todayString = formatDate(today);

  return (
    <div className="mb-8">
      {/* Weekly calendar */}
      <div className="flex justify-between gap-2">
        {currentWeek.map((date, index) => {
          const dateString = formatDate(date);
          const isToday = dateString === todayString;
          const dayName = date.toLocaleDateString("en-US", {
            weekday: "short",
          });
          const dayNumber = date.getDate().toString().padStart(2, "0");

          return (
            <div
              key={index}
              className={`
                flex flex-col items-center justify-center w-12 h-16 rounded-2xl transition-colors
                ${
                  isToday
                    ? "bg-yellow-500 text-black"
                    : "text-white hover:opacity-80"
                }
              `}
              style={!isToday ? { backgroundColor: "#262626" } : {}}
            >
              <div
                className={`text-sm font-medium ${
                  isToday ? "text-black" : "text-white"
                }`}
              >
                {dayName}
              </div>
              <div
                className={`text-sm ${isToday ? "text-black" : "text-white"}`}
              >
                {dayNumber}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Get array of dates for current week (Sunday to Saturday)
 */
function getCurrentWeek(date: Date): Date[] {
  const week = [];
  const startOfWeek = new Date(date);

  // Get Sunday of current week
  const day = startOfWeek.getDay();
  const diff = startOfWeek.getDate() - day;
  startOfWeek.setDate(diff);

  // Generate 7 days starting from Sunday
  for (let i = 0; i < 7; i++) {
    const weekDay = new Date(startOfWeek);
    weekDay.setDate(startOfWeek.getDate() + i);
    week.push(weekDay);
  }

  return week;
}
