import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import css from './MonthStatsTable.module.css';
import { getWaterStatisticsForDateRange } from 'store/operations.js';
import {
  createConsumptionRecordSelector,
  deleteConsumptionRecordSelector,
  getStatisticsSelector,
  updateConsumptionRecordSelector,
  updateWaterGoalSelector,
} from 'store/selectors.js';

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
  const deletingWater = useSelector(deleteConsumptionRecordSelector);
  const creatingWater = useSelector(createConsumptionRecordSelector);
  const updatingWater = useSelector(updateConsumptionRecordSelector);
  const updatingWaterGoal = useSelector(updateWaterGoalSelector);

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

    switch (true) {
      case !deletingWater.isLoading && !deletingWater.error:
      case !creatingWater.isLoading && !creatingWater.error:
      case !updatingWater.isLoading && !updatingWater.error:
      case !updatingWaterGoal.isLoading && !updatingWaterGoal.error:
        dispatch(
          getWaterStatisticsForDateRange({
            fromDate: new Date(currentYear, currentMonth, 0).toISOString(),
            toDate: new Date(currentYear, currentMonth + 1, 0).toISOString(),
          })
        );
        break;
      default:
        break;
    }
  }, [
    dispatch,
    currentDate,
    deletingWater,
    creatingWater,
    updatingWater,
    updatingWaterGoal,
  ]);

  const calculatePopupPosition = liId => {
    // Hover element
    const liElement = document.getElementById(liId);
    // Container elements borders of which not to exceed
    const calendarBodyElement = document.getElementById('calendarBody');
    // Width of the popup element
    const popupWidth = 280;

    if (!liElement || !calendarBodyElement) {
      return;
    }

    const liRect = liElement.getBoundingClientRect();
    const calendarBodyRect = calendarBodyElement.getBoundingClientRect();

    // Move popup to be centered in the middle of LI element
    let popupLeft = liRect.width / 2;

    // Get left and right coordinates of the popup
    // Because we use transform translate -50%, move the boundaries by 50% here too
    let liLeftCoordinates = liRect.x + popupLeft - popupWidth / 2;
    let liRightCoordinates = liRect.x + popupLeft - popupWidth / 2 + popupWidth;

    // Get left and right container boundaries
    const containerLeftBoundary = calendarBodyRect.x;
    const containerRightBoundary = calendarBodyRect.x + calendarBodyRect.width;

    // Check if the right boundary crossed, then move it right to be on the border
    if (liRightCoordinates > containerRightBoundary) {
      popupLeft -= liRightCoordinates - containerRightBoundary;
    }

    // Check if the left boundary crossed, then move it right to be on the border
    if (liLeftCoordinates < containerLeftBoundary) {
      popupLeft += containerLeftBoundary - liLeftCoordinates;
    }

    return popupLeft + 'px';
  };

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
            let buttonClassNames = css.buttonCalendar;

            if (!statistic?.consumptionPercentage) {
            } else if (statistic?.consumptionPercentage < 20) {
              buttonClassNames += ` ${css.orangeBackground}`;
            } else if (statistic?.consumptionPercentage < 100) {
              buttonClassNames += ` ${css.redBackground}`;
            } else {
              buttonClassNames += ` ${css.greenBackground}`;
            }

            return (
              <li
                className={css.containerList}
                key={`day-${day}`}
                id={`day-${day}`}
              >
                <div className={buttonClassNames}>
                  <span className={css.calendarDay}>{day}</span>
                </div>
                <p className={css.itemCalendary}>
                  {statistic?.consumptionPercentage || '0'}%
                </p>
                {statistic && (
                  <div
                    className={css.modalBackground}
                    style={{ left: calculatePopupPosition(`day-${day}`) }}
                  >
                    <div className={css.modalContent}>
                      <p className={css.titleModal}>
                        <span className={css.selectedTimes}>
                          {day}, {monthNames[currentDate.getMonth()]}
                        </span>
                      </p>
                      <p className={css.titleModal}>
                        Daily norma:
                        <span
                          className={`${css.selectedTimes} ${css.statisticValue}`}
                        >
                          {' '}
                          {statistic?.dailyWaterGoal} L
                        </span>
                      </p>
                      <p className={css.titleModal}>
                        Fulfillment of the daily norm:
                        <span
                          className={`${css.selectedTimes} ${css.statisticValue}`}
                        >
                          {' '}
                          {statistic?.consumptionPercentage}%
                        </span>
                      </p>
                      <p className={css.titleModal}>
                        How many servings of water:
                        <span
                          className={`${css.selectedTimes} ${css.statisticValue}`}
                        >
                          {' '}
                          {statistic?.count}
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
