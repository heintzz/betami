'use client';
import '@/app/page.css';
import activities from '@/helpers/data';
import { useMemo, useState } from 'react';
import ActivityList from './components/ActivityList';
import DatePicker from './components/DatePicker';
import HomeHeader from './components/HomeHeader';
import HorizontalDatePicker from './components/HorizontalDatePicker';

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dateMetadata, setDateMetadata] = useState({
    year: selectedDate.getFullYear(),
    month: selectedDate.getMonth(),
    day: selectedDate.getDate(),
  });
  const position = useMemo(() => {
    return selectedDate.getDate();
  }, [selectedDate]);

  const onSelectDate = (day: number) => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const newDate = new Date(year, month, day, 0);
    setSelectedDate(newDate);
    setDateMetadata({
      year,
      month,
      day,
    });
  };

  const onSelectCustomDate = (day: number) => {
    const year = dateMetadata.year;
    const month = dateMetadata.month;
    const newDate = new Date(year, month, day, 0);
    setSelectedDate(newDate);
    setDateMetadata((prev) => {
      return { ...prev, day };
    });
  };

  return (
    <div className="min-h-screen w-screen max-w-[450px] flex flex-col gap-y-4 p-8 border font-[family-name:var(--font-geist-mono)]">
      <HomeHeader date={selectedDate} />
      <HorizontalDatePicker
        selectDate={onSelectDate}
        selectedDate={selectedDate}
        position={position}
      />
      <ActivityList activities={activities} />
      <DatePicker
        selectedDate={selectedDate}
        selectDate={onSelectCustomDate}
        metadata={dateMetadata}
        setMetadata={setDateMetadata}
      />
    </div>
  );
}
