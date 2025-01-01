import DateHelper from '@/helpers/date';
import { useMemo } from 'react';

interface IDateElement {
  days: Array<number>;
  isActive?: boolean;
  // selectDate: () => void;
}

// TODO
// interface IDatePicker {
//   date: Date;
//   onSelected: () => void;
// }

const ArrayBuilder = (total: number) => {
  return Array.from({ length: total }, (_, v) => {
    const dayIndex = v + 1;
    return dayIndex;
  });
};

const DateElement = (props: IDateElement) => {
  const { days, isActive } = props;

  return days.map((dayIndex) => {
    return (
      <p
        onClick={() => {
          if (!isActive) return;
          alert('hi');
        }}
        className={`min-h-12 grid place-content-center ${
          isActive ? 'text-black' : 'text-gray-200'
        }`}
        key={dayIndex}
      >
        {dayIndex}
      </p>
    );
  });
};

const DatePicker = ({ date }: { date: Date }) => {
  const { preceedingCalendarDates, activeDates, remainingDates } = useMemo(() => {
    const total = DateHelper.getDaysInMonth(date);
    const startIndex = DateHelper.getDayIndex(DateHelper.getDayName(date, 1));
    const previousMonthDays = DateHelper.getDaysInPreviousMonth(date);

    const preceedingCalendarDates = Array.from(
      { length: startIndex },
      (_, v) => previousMonthDays - v
    ).reverse();
    const activeDates = ArrayBuilder(total);
    const remainingDates = ArrayBuilder(7 * 6 - total - preceedingCalendarDates.length);

    return { preceedingCalendarDates, activeDates, remainingDates };
  }, [date]);

  return (
    <div className="grid grid-cols-7 grid-rows-6 text-center">
      <DateElement days={preceedingCalendarDates} />
      <DateElement days={activeDates} isActive={true} />
      <DateElement days={remainingDates} />
    </div>
  );
};

export default DatePicker;
