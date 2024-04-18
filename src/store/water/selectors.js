import { createSelector } from '@reduxjs/toolkit';

import { getConsumptionForToday, createConsumptionRecord } from './operations';

export const WaterReducerSelector = ({ waterReducer }) => waterReducer;

export const todayConsumptionSelector = createSelector(
  WaterReducerSelector,
  state => state.today
);

export const todayConsumptionPercentageSelector = createSelector(
  WaterReducerSelector,
  state => state.today.consumptionPercentage
);

export const todayConsumptionsSelector = createSelector(
  WaterReducerSelector,
  state => state.today.consumptions
);

export const getConsumptionForTodaySelector = createSelector(
  WaterReducerSelector,
  state => state[getConsumptionForToday.typePrefix]
);

export const createConsumptionRecordSelector = createSelector(
  WaterReducerSelector,
  state => state[createConsumptionRecord.typePrefix]
);
