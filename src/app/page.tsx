'use client';
import '@/app/page.css';
import activities from '@/helpers/data';
import { useMemo, useState } from 'react';
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
    <div className="min-h-screen max-w-[450px] p-8 bg-red-100 font-[family-name:var(--font-geist-mono)]">
      <HorizontalDatePicker
        selectDate={onSelectDate}
        selectedDate={selectedDate}
        position={position}
      />
      {activities.map((activity) => {
        return (
          <div key={activity.id} className="flex justify-between">
            <div className="flex">
              <div id="category-icon"></div>
              <div id="description" className="flex flex-col">
                <p>{activity.title}</p>
                <div className="flex gap-x-2">
                  <p>{activity.type}</p>
                  <p>{activity.id + ' PM'}</p>
                </div>
              </div>
            </div>
            <div id="status">{activity.status}</div>
          </div>
        );
      })}
    </div>
  );
}
