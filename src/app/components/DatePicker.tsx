import DateHelper from '@/helpers/date';
import { Dispatch, SetStateAction, useMemo } from 'react';

/**
 * @type days: iterable elements
 * @type: tempDate: date dari metadata, jadi bukan yang selectedDate
 * @type: isActive: tanda dia bisa dipencet
 * @type: selectDate: simply seng bisa mencet bisa ngeganti selectedDate
 */
interface IDateElement {
  actualDate: Date;
  days: Array<number>;
  tempDate: Date;
  isActive: boolean;
  selectDate?: (day: number) => void;
  position: number;
}

interface IDatePicker {
  selectedDate: Date;
  selectDate: (day: number) => void;
  metadata: ITempDateMetadata;
  setMetadata: Dispatch<SetStateAction<ITempDateMetadata>>;
  position: number;
  openModal: () => void;
  toggleCalendar: () => void;
}

export interface ITempDateMetadata {
  year: number;
  month: number;
}

const ArrayBuilder = (total: number) => {
  return Array.from({ length: total }, (_, v) => {
    const dayIndex = v + 1;
    return dayIndex;
  });
};

const DateElement = (props: IDateElement) => {
  const { days, actualDate, tempDate, isActive, position, selectDate = null } = props;

  const hasSameYearAndMonth =
    actualDate.getMonth() === tempDate.getMonth() &&
    actualDate.getFullYear() === tempDate.getFullYear();

  const isPreviousMonth =
    actualDate.getMonth() === (tempDate.getMonth() - 1 + 12) % 12 &&
    actualDate.getDate() > 20 &&
    (tempDate.getMonth() !== 0 || actualDate.getFullYear() === tempDate.getFullYear() - 1);

  const isNextMonth =
    actualDate.getMonth() === (tempDate.getMonth() + 1) % 12 &&
    actualDate.getDate() < 20 &&
    (tempDate.getMonth() !== 11 || actualDate.getFullYear() === tempDate.getFullYear() + 1);

  const previousOrNextMonth = isPreviousMonth || isNextMonth;

  return days.map((dayIndex) => {
    return (
      <div
        onClick={() => {
          if (!isActive) return;
          if (selectDate) selectDate(dayIndex);
        }}
        className={`min-h-12 grid place-content-center rounded-xl  ${
          isActive
            ? dayIndex == position && hasSameYearAndMonth
              ? 'text-white bg-purple-500 cursor-pointer'
              : 'text-black bg-gray-100 cursor-pointer'
            : dayIndex == position && previousOrNextMonth
            ? 'text-white bg-purple-100'
            : 'text-gray-200'
        }`}
        key={dayIndex}
      >
        {dayIndex}
      </div>
    );
  });
};

const DatePicker = ({
  selectedDate,
  selectDate,
  metadata,
  setMetadata,
  position,
  openModal,
  toggleCalendar,
}: IDatePicker) => {
  // BUG: kalo milih 31 trus nextnya bulannya cuma 28 dia ga bakal ngebug
  const { metadataDate, preceedingCalendarDates, activeDates, remainingDates } = useMemo(() => {
    const { year, month } = metadata;
    const metadataDate = new Date(year, month);
    const total = DateHelper.getDaysInMonth(metadataDate);
    const startIndex = DateHelper.getDayIndex(DateHelper.getDayName(metadataDate, 1));
    const previousMonthDays = DateHelper.getDaysInPreviousMonth(metadataDate);

    const preceedingCalendarDates = Array.from(
      { length: startIndex },
      (_, v) => previousMonthDays - v
    ).reverse();
    const activeDates = ArrayBuilder(total);
    const remainingDates = ArrayBuilder(7 * 6 - total - preceedingCalendarDates.length);

    return { metadataDate, preceedingCalendarDates, activeDates, remainingDates };
  }, [metadata]);

  return (
    <div className="absolute z-10 bottom-0 left-0 right-0 border bg-white rounded-t-2xl pt-4 pb-0">
      <div className="flex justify-between px-4">
        <button
          onClick={() =>
            setMetadata((prev) => {
              const isNegative = prev.month - 1 < 0;
              return {
                ...prev,
                year: isNegative ? prev.year - 1 : prev.year,
                month: isNegative ? 11 : prev.month - 1,
              };
            })
          }
        >
          &lt;
        </button>
        <div className="text-center mb-4 cursor-pointer" onClick={openModal}>
          <p className="font-bold">{DateHelper.getMonthName(metadata.month)}</p>
          <p>{metadata.year}</p>
        </div>
        <button
          onClick={() =>
            setMetadata((prev) => {
              const isBiggerThanEleven = prev.month + 1 > 11;
              return {
                ...prev,
                year: isBiggerThanEleven ? prev.year + 1 : prev.year,
                month: isBiggerThanEleven ? 0 : prev.month + 1,
              };
            })
          }
        >
          &gt;
        </button>
      </div>

      <div className="grid grid-cols-7 grid-rows-6 text-center gap-2 px-4">
        <DateElement
          days={preceedingCalendarDates}
          actualDate={selectedDate}
          tempDate={metadataDate}
          isActive={false}
          position={position}
        />
        <DateElement
          days={activeDates}
          actualDate={selectedDate}
          tempDate={metadataDate}
          isActive={true}
          selectDate={selectDate}
          position={position}
        />
        <DateElement
          days={remainingDates}
          actualDate={selectedDate}
          tempDate={metadataDate}
          isActive={false}
          position={position}
        />
      </div>
      <button className="text-center py-2 border w-full" onClick={toggleCalendar}>
        Close
      </button>
    </div>
  );
};

export default DatePicker;
