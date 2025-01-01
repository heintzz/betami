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

  const position = useMemo(() => {
    return selectedDate.getDate();
  }, [selectedDate]);

  const onSelectDate = (day: number) => {
    const newDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day, 0);
    setSelectedDate(newDate);
  };

  return (
    <div className="min-h-screen max-w-[450px] flex flex-col gap-y-4 p-8 border font-[family-name:var(--font-geist-mono)]">
      <HomeHeader date={selectedDate} />
      <HorizontalDatePicker
        selectDate={onSelectDate}
        selectedDate={selectedDate}
        position={position}
      />
      <ActivityList activities={activities} />
      <DatePicker date={selectedDate} />
    </div>
  );
}
