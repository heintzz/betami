const DateHelper = {
  getDaysInMonth: (date: Date): number => {
    const currentMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return currentMonth.getDate();
  },
  getDayName: (date: Date, day: number): string => {
    const currentDate = new Date(date.getFullYear(), date.getMonth(), day);
    const dayIndex = currentDate.getDay() % 7;
    return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dayIndex];
  },
};

export default DateHelper;
