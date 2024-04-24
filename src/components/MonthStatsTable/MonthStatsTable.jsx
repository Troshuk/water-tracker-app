import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import css from './MonthStatsTable.module.css';
import { getWaterStatisticsForDateRange } from 'store/operations.js';
import {
  createConsumptionRecordSelector,
  deleteConsumptionRecordSelector,
  getStatisticsSelector,
  updateConsumptionRecordSelector,
  updateWaterGoalSelector,
  userSelector,
  viewingDateSelector,
} from 'store/selectors.js';
import { updateViewingDate } from 'store/reducers';

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
  const { dailyWaterGoal } = useSelector(userSelector);
  const viewingDate = useSelector(viewingDateSelector);

  const setViewingDate = day => {
    dispatch(
      updateViewingDate(
        day
          ? new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              day
            ).toISOString()
          : null
      )
    );
  };

  const backToToday = () => {
    setState({ currentDate: new Date() });
    setViewingDate();
  };

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
  const isSameMonth = moment().isSame(currentDate, 'month');
  const currentDay = moment().date();
  const isSameDay = viewingDate ? moment().isSame(viewingDate, 'day') : true;
  const viewingDay = viewingDate ? moment(viewingDate).date() : false;

  const days = [];

  Array.from({ length: daysInMonth }).forEach((_, i) => {
    const day = i + 1;
    const isToday = isSameMonth && day === currentDay;

    const dayInfo = {
      day,
      isToday,
      isViewingDay: viewingDay && isSameMonth && day === viewingDay,
    };

    if (!isSameMonth || day <= currentDay) {
      dayInfo.statistic = {
        consumptionPercentage: 0,
        dailyWaterGoal,
        count: 0,
      };
    }

    days.push(dayInfo);
  });

  statistics?.forEach(statistic => {
    const day = Number(statistic.date.split('-').pop());
    days[day - 1] = { ...days[day - 1], statistic };
  });

  useEffect(() => {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    if (
      !deletingWater.isLoading &&
      !deletingWater.error &&
      !creatingWater.isLoading &&
      !creatingWater.error &&
      !updatingWater.isLoading &&
      !updatingWater.error &&
      !updatingWaterGoal.isLoading &&
      !updatingWaterGoal.error
    ) {
      dispatch(
        getWaterStatisticsForDateRange({
          fromDate: new Date(currentYear, currentMonth, 0).toISOString(),
          toDate: new Date(currentYear, currentMonth + 1, 0).toISOString(),
        })
      );
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
    const calendarBodyElement = document.getElementById('TodayAndMonthLayout');
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
      {(!isSameDay || !isSameMonth) && (
        <button className={css.backToToday} onClick={backToToday}>
          Back to Today
        </button>
      )}

      <div className={css.calendarHeader}>
        <h1 className={css.title}>Month</h1>
        <div className={css.containerCalendar}>
          <button onClick={() => goToMonth(-1)} className={css.itemButton}>
            &lt;
          </button>
          <h2 className={css.itemName}>
            {monthName}, {currentDate.getFullYear()}
          </h2>
          <button
            onClick={() => !isSameMonth && goToMonth(1)}
            className={css.itemButton}
            style={{
              cursor: isSameMonth ? 'not-allowed' : 'pointer',
              opacity: isSameMonth ? 0.3 : 1,
            }}
          >
            &gt;
          </button>
        </div>
      </div>
      <div className={css.calendarBody}>
        <ul className={css.calendarList}>
          {days.map(({ day, statistic, isToday, isViewingDay }) => {
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
                className={`${css.containerList} ${isToday && css.isToday} ${
                  isViewingDay && css.isViewingDay
                }`}
                key={`day-${day}`}
                id={`day-${day}`}
                onClick={() =>
                  statistic && setViewingDate(isToday ? null : day)
                }
                style={{ cursor: statistic ? 'pointer' : 'not-allowed' }}
              >
                <div className={buttonClassNames}>
                  <span className={`${css.calendarDay}`}>{day}</span>
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
