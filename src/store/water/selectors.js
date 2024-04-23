import { createSelector } from '@reduxjs/toolkit';

import {
  getConsumptionForToday,
  createConsumptionRecord,
  getWaterStatisticsForDateRange,
  updateConsumptionRecord,
  deleteConsumptionRecord,
} from './operations';

export const WaterReducerSelector = ({ waterReducer }) => waterReducer;

export const todayConsumptionSelector = createSelector(
  WaterReducerSelector,
  state => state.today
);

export const viewingDateSelector = createSelector(
  WaterReducerSelector,
  state => state.viewingDate
);

export const todayConsumptionPercentageSelector = createSelector(
  WaterReducerSelector,
  state => state.today.consumptionPercentage
);

export const dayConsumptionWaterGoalSelector = createSelector(
  WaterReducerSelector,
  state => state.today.dailyWaterGoal
);

export const todayConsumptionsSelector = createSelector(
  WaterReducerSelector,
  state => state.today.consumption
);

export const getStatisticsSelector = createSelector(
  WaterReducerSelector,
  state => state.calendarStatistics
);

export const getConsumptionForTodaySelector = createSelector(
  WaterReducerSelector,
  state => state[getConsumptionForToday.typePrefix]
);

export const updateConsumptionRecordSelector = createSelector(
  WaterReducerSelector,
  state => state[updateConsumptionRecord.typePrefix]
);

export const createConsumptionRecordSelector = createSelector(
  WaterReducerSelector,
  state => state[createConsumptionRecord.typePrefix]
);

export const getWaterStatisticsForDateRangeSelector = createSelector(
  WaterReducerSelector,
  state => state[getWaterStatisticsForDateRange.typePrefix]
);

export const deleteConsumptionRecordSelector = createSelector(
  WaterReducerSelector,
  state => state[deleteConsumptionRecord.typePrefix]
);
