import DateHelper from '@/helpers/date';
import React from 'react';

interface HorizontalDatePickerType {
  selectDate: (day: number) => void;
  selectedDate: Date;
  position: number;
}

export default function HorizontalDatePicker({
  selectDate,
  selectedDate,
  position,
}: HorizontalDatePickerType) {
  return (
    <div className="flex gap-x-2 overflow-x-hidden">
      {Array.from({ length: DateHelper.getDaysInMonth(selectedDate) }, (_, i) => {
        const day = i + 1;
        return (
          <div
            key={i}
            className={`flex flex-col w-[60px] h-20 rounded-2xl ${
              position == day ? 'active-card' : 'inactive-card'
            }`}
            onClick={() => selectDate(day)}
          >
            <p className="text-center mt-1">{DateHelper.getDayName(selectedDate, day)}</p>
            <div className="day w-[60px] h-12 rounded-2xl mt-auto grid place-content-center text-xl">
              <p>{day}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
