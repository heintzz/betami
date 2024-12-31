import React from 'react';
import { MdOutlineCalendarMonth } from 'react-icons/md';

const HomeHeader = ({ date }: { date: Date }) => {
  const today = new Date();
  const isToday =
    date.getDate() == today.getDate() &&
    date.getMonth() == today.getMonth() &&
    date.getFullYear() == today.getFullYear();
  return (
    <header className="flex justify-between items-center">
      <p>
        {isToday && 'Today, '}
        {date.toLocaleDateString('id-ID', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })}
      </p>
      <MdOutlineCalendarMonth size={24} />
    </header>
  );
};

export default HomeHeader;
