"use client";

import { Header } from "@/components/header";
import WeekNavigation from "@/components/weekNavigation";
import { use, useEffect, useState } from "react";
import { start } from "repl";

const formatDate = (date: Date) => {
  return date.toISOString().split("T")[0];
};

// get week dates for the current week
const getWeekDates = (weekOffset: number = 0): Date[] => {
  const today = new Date();
  const startOfWeek = new Date();
  startOfWeek.setDate(today.getDate() - today.getDay() + weekOffset * 7);

  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    return date;
  });
};

export default function Home() {
  const [currentWeek, setCurrentWeek] = useState<number>(0);
  const weekDates = getWeekDates(currentWeek);
  const today = formatDate(new Date());

  useEffect(() => {
    console.log("✔️ Week Dates Updated: ", weekDates);
  }, [currentWeek]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-md mx-auto space-y-4">
        <Header />

        {/* 🔹 Week Navigation */}
        <WeekNavigation
          currentWeek={currentWeek}
          setCurrentWeek={setCurrentWeek}
          weekDates={weekDates}
          formatDate={formatDate}
          today={today}
        />
      </div>
    </div>
  );
}
