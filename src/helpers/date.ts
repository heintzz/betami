const DateHelper = {
  getDaysInMonth: (date: Date): number => {
    const currentMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return currentMonth.getDate();
  },
  getDaysInPreviousMonth: (date: Date): number => {
    const currentMonth = new Date(date.getFullYear(), date.getMonth(), 0);
    return currentMonth.getDate();
  },
  getDayName: (date: Date, day: number): string => {
    const currentDate = new Date(date.getFullYear(), date.getMonth(), day);
    const dayIndex = currentDate.getDay() % 7;
    return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dayIndex];
  },
  getDayIndex: (dayName: string): number => {
    return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].findIndex((a) => a === dayName);
  },
  getMonthName: (monthIndex: number): string => {
    return [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'Oktober',
      'November',
      'Desember',
    ][monthIndex];
  },
};

export default DateHelper;
