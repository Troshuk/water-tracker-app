import { createSelector } from '@reduxjs/toolkit';

export const CalendarReducerSelector = ({ CalendarReducer }) => CalendarReducer;

export const selectMonthPercentage = createSelector(
  CalendarReducerSelector,
  state => state.water.itemsPerMonth
);

export const selectWaterRate = createSelector(
  CalendarReducerSelector,
  state => state.auth.user.waterRate
);

export const selectListWaterOfDay = createSelector(
  CalendarReducerSelector,
  state => state.water.listWaterOfDay
);

export const selectDayPercentage = createSelector(
  CalendarReducerSelector,
  state => state.water.percentOfDailyNorm
);
