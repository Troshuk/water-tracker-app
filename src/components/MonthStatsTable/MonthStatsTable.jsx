import { useState } from 'react';
import css from './MonthStatsTable.module.css';

export const MonthStatsTable = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = date => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return new Date(year, month, 0).getDate();
  };

  const getMonthName = date => {
    const options = { month: 'long' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const monthName = getMonthName(currentDate);

    const days = [];

    Array.from({ length: daysInMonth }).forEach((_, i) => {
      const day = i + 1;
      days.push(
        <div>
          <button className={css.buttonCalendar}>
            <li key={`day-${day}`} className={css.calendarDay}>
              {day}
            </li>
          </button>
          <p className={css.itemCalendary}>100%</p>
        </div>
      );
    });

    return (
      <div className={css.calendar}>
        <div className={css.calendarHeader}>
          <h1 className={css.title}>Month</h1>
          <div className={css.containerCalendar}>
            <button onClick={goToPreviousMonth} className={css.itemButton}>
              &lt;
            </button>
            <h2 className={css.itemName}>
              {monthName},{currentDate.getFullYear()}
            </h2>
            <button onClick={goToNextMonth} className={css.itemButton}>
              &gt;
            </button>
          </div>
        </div>
        <div className={css.calendarBody}>
          <ul className={css.calendarList}>{days}</ul>
        </div>
      </div>
    );
  };

  return renderCalendar();
};
