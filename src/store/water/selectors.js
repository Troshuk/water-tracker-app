import { createSelector } from '@reduxjs/toolkit';

import { getConsumptionForToday, createConsumptionRecord } from './operations';

export const WaterReducerSelector = ({ waterReducer }) => waterReducer;

export const todayConsumptionSelector = createSelector(
  WaterReducerSelector,
  state => state.today
);

export const todayConsumptionPercentageSelector = createSelector(
  todayConsumptionSelector,
  state => state.consumptionPercentage
);

export const todayConsumptionsSelector = createSelector(
  todayConsumptionSelector,
  state => state.consumption
);

export const getConsumptionForTodaySelector = createSelector(
  WaterReducerSelector,
  state => state[getConsumptionForToday.typePrefix]
);

export const createConsumptionRecordSelector = createSelector(
  WaterReducerSelector,
  state => state[createConsumptionRecord.typePrefix]
);
