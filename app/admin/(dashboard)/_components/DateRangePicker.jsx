"use client";

import React, { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const inter = Inter({ subsets: ["latin"] });

const degular = localFont({
  src: "../../../../components/fonts/degular/DegularDemo-Semibold.otf",
});

const DAYS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

function formatDate(date) {
  if (!date) return "";
  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
}

function formatDateLong(date) {
  if (!date) return "";
  const d = date.getDate();
  const m = MONTHS[date.getMonth()];
  const y = date.getFullYear();
  return `${d} ${m} ${y}`;
}

function isToday(year, month, day) {
  const today = new Date();
  return (
    today.getFullYear() === year &&
    today.getMonth() === month &&
    today.getDate() === day
  );
}

function isSameDay(d1, d2) {
  if (!d1 || !d2) return false;
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

function isInRange(date, start, end) {
  if (!start || !end) return false;
  return date >= start && date <= end;
}

const DateRangePicker = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selecting, setSelecting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <Button
        variant="outline"
        className="bg-white border-[#E5E5E5] text-[#6C6C6C] font-medium rounded-[12px] h-[44px] px-4 shadow-sm"
      >
        <Calendar className="w-4 h-4 mr-2" />
        Date Range
      </Button>
    );
  }

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDayClick = (day) => {
    const clicked = new Date(currentYear, currentMonth, day);
    if (!selecting || !startDate) {
      setStartDate(clicked);
      setEndDate(null);
      setSelecting(true);
    } else {
      if (clicked < startDate) {
        setEndDate(startDate);
        setStartDate(clicked);
      } else {
        setEndDate(clicked);
      }
      setSelecting(false);
    }
  };

  const calendarDays = useMemo(() => {
    const days = [];
    // Empty cells for days before the 1st
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let d = 1; d <= daysInMonth; d++) {
      days.push(d);
    }
    return days;
  }, [firstDay, daysInMonth]);

  const weeks = useMemo(() => {
    const result = [];
    for (let i = 0; i < calendarDays.length; i += 7) {
      result.push(calendarDays.slice(i, i + 7));
    }
    return result;
  }, [calendarDays]);

  const getDayStatus = (day) => {
    if (!day) return {};
    const date = new Date(currentYear, currentMonth, day);
    const isStart = isSameDay(date, startDate);
    const isEnd = isSameDay(date, endDate);
    const inRange = startDate && endDate && isInRange(date, startDate, endDate);
    const isTodayDate = isToday(currentYear, currentMonth, day);

    return { isStart, isEnd, inRange, isTodayDate };
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="bg-white border-[#E5E5E5] text-[#6C6C6C] font-medium rounded-[12px] h-[44px] px-4 shadow-sm"
        >
          <Calendar className="w-4 h-4 mr-2" />
          Date Range
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[422px] p-0 border-0 shadow-[0px_10px_40px_rgba(0,0,0,0.1)]"
        align="end"
        sideOffset={8}
      >
        <div
          className={`${inter.className} bg-white rounded-[10px] p-5`}
          style={{ width: 422 }}
        >
          {/* Title */}
          <h3
            className={`${degular.className} text-[22px] text-[#24282E] mb-6`}
          >
            Select Date Range
          </h3>

          {/* Date From / Date To Inputs */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <label className="text-[13px] text-[#6C6C6C] font-medium block mb-2">
                Date From
              </label>
              <div className="w-full h-[48px] border border-[#E5E5E5] rounded-[24px] px-4 flex items-center">
                <span className="text-[14px] text-[#B0B0B0]">
                  {startDate ? formatDate(startDate) : "dd/mm/yyyy"}
                </span>
              </div>
            </div>
            <div className="flex-1">
              <label className="text-[13px] text-[#6C6C6C] font-medium block mb-2">
                Date To
              </label>
              <div className="w-full h-[48px] border border-[#E5E5E5] rounded-[24px] px-4 flex items-center">
                <span className="text-[14px] text-[#B0B0B0]">
                  {endDate ? formatDate(endDate) : "dd/mm/yyyy"}
                </span>
              </div>
            </div>
          </div>

          {/* Calendar */}
          <div className="border border-[#F2F2F2] rounded-[16px] p-5">
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-5">
              <button
                onClick={prevMonth}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-[#24282E]" />
              </button>
              <span
                className={`${degular.className} text-[17px] text-[#24282E]`}
              >
                {MONTHS[currentMonth]} {currentYear}
              </span>
              <button
                onClick={nextMonth}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-[#24282E]" />
              </button>
            </div>

            {/* Day Headers */}
            <div className="grid grid-cols-7 mb-2">
              {DAYS.map((day, i) => (
                <div
                  key={i}
                  className="h-10 flex items-center justify-center text-[14px] font-semibold text-[#24282E]"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="flex flex-col">
              {weeks.map((week, wi) => (
                <div key={wi} className="grid grid-cols-7">
                  {week.map((day, di) => {
                    if (!day) {
                      return <div key={di} className="h-[52px]" />;
                    }

                    const { isStart, isEnd, inRange, isTodayDate } =
                      getDayStatus(day);
                    const isSelected = isStart || isEnd;
                    const isMiddle = inRange && !isSelected;

                    // Determine the range bar rounding for each cell
                    // The bar stretches full width, but gets rounded on the edges of the range
                    let barRounding = "";
                    if (isStart && isEnd) {
                      barRounding = "rounded-full";
                    } else if (isStart) {
                      barRounding = "rounded-l-full";
                    } else if (isEnd) {
                      barRounding = "rounded-r-full";
                    }

                    // Also round at row boundaries for middle cells
                    if (isMiddle) {
                      const isFirstInRow = di === 0;
                      const isLastInRow = di === 6 || di === week.length - 1;
                      if (isFirstInRow && isLastInRow) {
                        barRounding = "rounded-full";
                      } else if (isFirstInRow) {
                        barRounding = "rounded-l-full";
                      } else if (isLastInRow) {
                        barRounding = "rounded-r-full";
                      }
                    }

                    const textClass = isSelected
                      ? "text-white"
                      : inRange
                        ? "text-[#E07386]"
                        : "text-[#6C6C6C]";

                    return (
                      <div
                        key={di}
                        className="h-[52px] flex items-center justify-center relative"
                      >
                        {/* Range bar background — stretches full cell width, low opacity */}
                        {isMiddle && (
                          <div
                            className={`absolute inset-y-[6px] inset-x-0 bg-[#E07386]/20 ${barRounding}`}
                          />
                        )}

                        {/* Start/End connector bar — half-cell bar on the range side, low opacity */}
                        {isStart && inRange && !isEnd && (
                          <div className="absolute inset-y-[6px] left-1/2 right-0 bg-[#E07386]/20" />
                        )}
                        {isEnd && inRange && !isStart && (
                          <div className="absolute inset-y-[6px] left-0 right-1/2 bg-[#E07386]/20" />
                        )}

                        {/* Start/End circle — always fully round, full opacity */}
                        {isSelected && (
                          <div className="absolute w-[40px] h-[40px] rounded-full bg-[#E07386]" />
                        )}

                        {/* Today Indicator — solid pink circle with white text */}
                        {isTodayDate && !isSelected && !inRange && (
                          <div className="absolute top-[2px] w-[42px] h-[42px] rounded-full bg-[#E07386]" />
                        )}

                        {/* Day Button */}
                        <button
                          onClick={() => handleDayClick(day)}
                          className={`relative z-10 w-full h-full flex flex-col items-center transition-colors ${
                            isTodayDate && !isSelected && !inRange
                              ? "text-white"
                              : textClass
                          } text-[15px] font-medium hover:opacity-80 ${
                            isTodayDate && !isSelected && !inRange
                              ? "justify-start pt-[14px]"
                              : "justify-center"
                          }`}
                        >
                          <span>{day}</span>
                          {isTodayDate && !isSelected && !inRange && (
                            <>
                              <span className="absolute top-[4px] right-[7px] w-[7px] h-[7px] bg-white rounded-full z-20" />
                              <span className="text-[10px] text-[#24282E] font-semibold leading-none mt-[8px]">
                                Today
                              </span>
                            </>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Selected Range Display */}
          {startDate && endDate && (
            <div className="flex items-center gap-2.5 mt-6">
              <div className="w-[12px] h-[12px] rounded-full bg-[#E07386]" />
              <span className="text-[15px] font-medium text-[#24282E]">
                {formatDateLong(startDate)} - {formatDateLong(endDate)}
              </span>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DateRangePicker;
