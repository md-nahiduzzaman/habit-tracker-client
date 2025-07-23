import { formatCurrentDate } from "@/utils/dateUtils";

interface DateAndStatsProps {
  completionRate: number;
}

/**
 * Display current date and completion statistics
 */
export default function DateAndStats({ completionRate }: DateAndStatsProps) {
  const { dayName, dateString } = formatCurrentDate();

  return (
    <div className="flex items-center justify-between mb-8">
      {/* Current date */}
      <div>
        <div className="text-gray-400 text-sm">{dayName}</div>
        <div className="text-xl font-medium">{dateString}</div>
      </div>

      {/* Completion rate */}
      <div className="text-right">
        <div className="text-gray-400 text-sm">Complete Rate</div>
        <div className="text-xl font-medium">{completionRate}%</div>
      </div>
    </div>
  );
}
