'use client';
import '@/app/page.css';
import activities from '@/helpers/data';
import { useMemo, useState } from 'react';
import ActivityList from './components/ActivityList';
import CalendarModal from './components/CalendarModal';
import DatePicker, { ITempDateMetadata } from './components/DatePicker';
import HomeHeader from './components/HomeHeader';
import HorizontalDatePicker from './components/HorizontalDatePicker';

export default function Home() {
  const [openCalendar, setOpenCalendar] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dateMetadata, setDateMetadata] = useState({
    year: selectedDate.getFullYear(),
    month: selectedDate.getMonth(),
  });

  const selectedDay = useMemo(() => {
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
    });
  };

  const onSelectCustomDate = (day: number) => {
    const year = dateMetadata.year;
    const month = dateMetadata.month;
    const newDate = new Date(year, month, day, 0);
    setSelectedDate(newDate);
    setDateMetadata((prev) => {
      return { ...prev };
    });
  };

  const updateMetadata = (newMetadata: ITempDateMetadata) => {
    setDateMetadata(newMetadata);
  };

  const toggleCalendar = () => {
    setOpenCalendar((prev) => !prev);
    setDateMetadata({
      year: selectedDate.getFullYear(),
      month: selectedDate.getMonth(),
    });
  };

  const toggleCalendarModal = () => {
    setShowCalendarModal((prev) => !prev);
  };

  return (
    <div className="min-h-screen w-screen max-w-[450px] flex flex-col gap-y-4 p-8 border font-[family-name:var(--font-geist-mono)]">
      <HomeHeader date={selectedDate} toggleCalendar={toggleCalendar} />
      <HorizontalDatePicker
        selectDate={onSelectDate}
        selectedDate={selectedDate}
        position={selectedDay}
      />
      <ActivityList activities={activities} />
      {openCalendar && (
        <DatePicker
          selectedDate={selectedDate}
          selectDate={onSelectCustomDate}
          metadata={dateMetadata}
          setMetadata={setDateMetadata}
          position={selectedDay}
          openModal={toggleCalendarModal}
          toggleCalendar={toggleCalendar}
        />
      )}
      <CalendarModal
        isOpen={showCalendarModal}
        onClose={toggleCalendarModal}
        onSave={updateMetadata}
        metadata={dateMetadata}
      />
    </div>
  );
}
