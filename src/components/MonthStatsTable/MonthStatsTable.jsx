import React, { useState } from 'react';
import css from './MonthStatsTable.module.css';
import useModal from 'components/customHooks/useModal';

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const MonthStatsTable = () => {
  const [state, setState] = useState({
    currentDate: new Date(),
    selectedDate: null,
    selectedMonth: null,
  });

  const { currentDate, selectedDate, selectedMonth } = state;
  const { isOpen, openModal, closeModal } = useModal();

  const getDaysInMonth = date =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  const getMonthName = date => {
    const options = { month: 'long' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  const goToMonth = increment => {
    setState(prevState => ({
      ...prevState,
      currentDate: new Date(
        prevState.currentDate.getFullYear(),
        prevState.currentDate.getMonth() + increment
      ),
    }));
  };

  const handleDateClick = day => {
    setState(prevState => ({
      ...prevState,
      selectedDate: day,
      selectedMonth: prevState.currentDate.getMonth(),
    }));
    openModal();
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const monthName = getMonthName(currentDate);

  const days = [];

  Array.from({ length: daysInMonth }).forEach((_, i) => {
    const day = i + 1;
    days.push(
      <div className={css.containerList} key={`day-${day}`}>
        <button
          className={css.buttonCalendar}
          onClick={() => handleDateClick(day)}
        >
          <li className={css.calendarDay}>{day}</li>
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
          <button onClick={() => goToMonth(-1)} className={css.itemButton}>
            &lt;
          </button>
          <h2 className={css.itemName}>
            {monthName},{currentDate.getFullYear()}
          </h2>
          <button onClick={() => goToMonth(1)} className={css.itemButton}>
            &gt;
          </button>
        </div>
      </div>
      <div className={css.calendarBody}>
        {isOpen && (
          <div className={css.modalBackground}>
            <div className={css.modalContent}>
              <p>
                <span className={css.selectedTimes}>
                  {selectedDate}, {monthNames[selectedMonth]}
                </span>
              </p>
              <p className={css.titleModal}>
                Daily norma:
                <span className={css.selectedTimes}> 1.8L</span>
              </p>
              <p className={css.titleModal}>
                Fulfillment of the daily norm:
                <span className={css.selectedTimes}> 100%</span>
              </p>
              <p className={css.titleModal}>
                How many servings of water:
                <span className={css.selectedTimes}> 6</span>
              </p>
              <button onClick={closeModal}>Close Modal</button>
            </div>
          </div>
        )}
        <ul className={css.calendarList}>{days}</ul>
      </div>
    </div>
  );
};
