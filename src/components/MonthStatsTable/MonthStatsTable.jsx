import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import css from './MonthStatsTable.module.css';
import { getWaterStatisticsForDateRange } from 'store/operations.js';
import { getStatisticsSelector } from 'store/selectors.js';

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
  const dispatch = useDispatch();
  const [state, setState] = useState({
    currentDate: new Date(),
  });

  const { currentDate } = state;

  const statistics = useSelector(getStatisticsSelector);

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

  const daysInMonth = getDaysInMonth(currentDate);
  const monthName = getMonthName(currentDate);

  const days = [];

  Array.from({ length: daysInMonth }).forEach((_, i) => {
    const day = i + 1;
    days.push({ day });
  });

  statistics?.forEach(statistic => {
    const day = Number(statistic.date.split('-').pop());
    days[day - 1] = { ...days[day - 1], statistic };
  });

  useEffect(() => {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    dispatch(
      getWaterStatisticsForDateRange({
        fromDate: new Date(currentYear, currentMonth, 0).toISOString(),
        toDate: new Date(currentYear, currentMonth + 1, 0).toISOString(),
      })
    );
  }, [dispatch, currentDate]);

  return (
    <div className={css.calendar}>
      <div className={css.calendarHeader}>
        <h1 className={css.title}>Month</h1>
        <div className={css.containerCalendar}>
          <button onClick={() => goToMonth(-1)} className={css.itemButton}>
            &lt;
          </button>
          <h2 className={css.itemName}>
            {monthName}, {currentDate.getFullYear()}
          </h2>
          <button onClick={() => goToMonth(1)} className={css.itemButton}>
            &gt;
          </button>
        </div>
      </div>
      <div className={css.calendarBody}>
        <ul className={css.calendarList}>
          {days.map(({ day, statistic }) => {
            const randomStatistic = {
              consumptionPercentage: statistic
                ? statistic.consumptionPercentage
                : Math.floor(Math.random() * 101),
              dailyWaterGoal: statistic
                ? statistic.dailyWaterGoal
                : Math.floor(Math.random() * 5000) + 1,
              count: statistic
                ? statistic.count
                : Math.floor(Math.random() * 15) + 1,
            };

            let buttonClassNames = css.buttonCalendar;

            if (randomStatistic.consumptionPercentage < 20) {
              buttonClassNames += ` ${css.orangeBackground}`;
            } else if (randomStatistic.consumptionPercentage < 100) {
              buttonClassNames += ` ${css.redBackground}`;
            } else {
              buttonClassNames += ` ${css.greenBackground}`;
            }
            return (
              <li className={css.containerList} key={`day-${day}`}>
                <div className={buttonClassNames}>
                  <span className={css.calendarDay}>{day}</span>
                </div>
                <p className={css.itemCalendary}>
                  {randomStatistic?.consumptionPercentage || '0'}%
                </p>
                {statistic && (
                  <div className={css.modalBackground}>
                    <div className={css.modalContent}>
                      <p>
                        <span className={css.selectedTimes}>
                          {day}, {monthNames[currentDate.getMonth()]}
                        </span>
                      </p>
                      <p className={css.titleModal}>
                        Daily norma:
                        <span className={css.selectedTimes}>
                          {' '}
                          {randomStatistic?.dailyWaterGoal}L
                        </span>
                      </p>
                      <p className={css.titleModal}>
                        Fulfillment of the daily norm:
                        <span className={css.selectedTimes}>
                          {' '}
                          {randomStatistic?.consumptionPercentage}%
                        </span>
                      </p>
                      <p className={css.titleModal}>
                        How many servings of water:
                        <span className={css.selectedTimes}>
                          {' '}
                          {randomStatistic?.count}
                        </span>
                      </p>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
