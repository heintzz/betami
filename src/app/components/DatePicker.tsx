import DateHelper from '@/helpers/date';
import { Dispatch, SetStateAction, useMemo } from 'react';

interface IDateElement {
  days: Array<number>;
  date?: Date;
  selectDate?: (day: number) => void;
}

interface IDatePicker {
  date: Date;
  selectDate: (day: number) => void;
  metadata: {
    year: number;
    month: number;
  };
  setMetadata: Dispatch<
    SetStateAction<{
      year: number;
      month: number;
    }>
  >;
}

const ArrayBuilder = (total: number) => {
  return Array.from({ length: total }, (_, v) => {
    const dayIndex = v + 1;
    return dayIndex;
  });
};

const DateElement = (props: IDateElement) => {
  const { days, date, selectDate = null } = props;
  const isActive = date ? true : false;
  const indexSelected = date && date.getDate();

  return days.map((dayIndex) => {
    return (
      <div
        onClick={() => {
          if (!isActive) return;
          if (selectDate) selectDate(dayIndex);
        }}
        className={`min-h-12 grid place-content-center rounded-xl cursor-pointer ${
          isActive
            ? dayIndex == indexSelected
              ? 'text-white bg-purple-500'
              : 'text-black bg-gray-100'
            : 'text-gray-200'
        }`}
        key={dayIndex}
      >
        {dayIndex}
      </div>
    );
  });
};

const DatePicker = ({ date, selectDate, metadata, setMetadata }: IDatePicker) => {
  /* TODO: re-calculate the calendar layout  on metadata change */
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
    <div className="border rounded-t-2xl p-4 absolute z-10 bottom-0 w-[100%] max-w-[450px] -translate-x-8 ">
      <div className="flex justify-between">
        <button
          onClick={() =>
            setMetadata((prev) => {
              const isNegative = prev.month - 1 < 0;
              return {
                year: isNegative ? prev.year - 1 : prev.year,
                month: isNegative ? 11 : prev.month - 1,
              };
            })
          }
        >
          &lt;
        </button>
        <div className="text-center mb-4">
          <p className="font-bold">{DateHelper.getMonthName(metadata.month)}</p>
          <p>{metadata.year}</p>
        </div>
        <button
          onClick={() =>
            setMetadata((prev) => {
              const isBiggerThanEleven = prev.month + 1 > 11;
              return {
                year: isBiggerThanEleven ? prev.year + 1 : prev.year,
                month: isBiggerThanEleven ? 0 : prev.month + 1,
              };
            })
          }
        >
          &gt;
        </button>
      </div>

      <div className="grid grid-cols-7 grid-rows-6 text-center gap-2">
        <DateElement days={preceedingCalendarDates} />
        <DateElement days={activeDates} date={date} selectDate={selectDate} />
        <DateElement days={remainingDates} />
      </div>
    </div>
  );
};

export default DatePicker;
