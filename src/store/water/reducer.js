import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import {
  getConsumptionForToday,
  createConsumptionRecord,
  deleteConsumptionRecord,
  getWaterStatisticsForDateRange,
  updateConsumptionRecord,
} from './operations';

const getStateKey = (type, meta) => type.replace(`/${meta.requestStatus}`, '');

const initialState = {
  today: {
    consumptionPercentage: 0,
    consumption: [],
  },
  calendarStatistics: [],
  ...[
    getConsumptionForToday,
    createConsumptionRecord,
    deleteConsumptionRecord,
    getWaterStatisticsForDateRange,
    updateConsumptionRecord,
  ].reduce(
    (acc, operation) => ({
      ...acc,
      [operation.typePrefix]: { isLoading: false, error: null, key: null },
    }),
    {}
  ),
};

export const waterSlice = createSlice({
  name: 'water',
  initialState,
  extraReducers: builder => {
    builder
      // Get consumption for today
      .addCase(getConsumptionForToday.fulfilled, (state, { payload }) => {
        state.today = payload;
      })
      // Create consumption record
      .addCase(createConsumptionRecord.fulfilled, (state, { payload }) => {
        state.today.consumption.push(payload);
      })

      // Delete consumption record
      .addCase(deleteConsumptionRecord.fulfilled, (state, { payload }) => {
        state.today.consumption = state.today.consumption.filter(
          water => water.id !== payload.id
        );
      })
      // Update consumption record
      .addCase(updateConsumptionRecord.fulfilled, (state, { payload }) => {
        const updatedIndex = state.today.consumption.findIndex(
          water => water.id === payload.id
        );
        if (updatedIndex !== -1) {
          state.today.consumption[updatedIndex] = payload;
        }
      })

      // Get Water Statistics For Date Range
      .addCase(
        getWaterStatisticsForDateRange.fulfilled,
        (state, { payload }) => {
          state.calendarStatistics = payload;
        }
      )

      // Handle fulfilled requests status
      .addMatcher(
        isAnyOf(
          getConsumptionForToday.fulfilled,
          createConsumptionRecord.fulfilled,
          deleteConsumptionRecord.fulfilled,
          getWaterStatisticsForDateRange.fulfilled,
          updateConsumptionRecord.fulfilled
        ),
        (state, { type, meta }) => {
          state[getStateKey(type, meta)] = {
            isLoading: false,
            error: null,
            key: null,
          };
        }
      )
      // Handle Pending requests
      .addMatcher(
        isAnyOf(
          getConsumptionForToday.pending,
          createConsumptionRecord.pending,
          deleteConsumptionRecord.pending,
          getWaterStatisticsForDateRange.pending,
          updateConsumptionRecord.pending
        ),
        (state, { type, meta }) => {
          state[getStateKey(type, meta)] = {
            isLoading: true,
            error: null,
            key: meta.arg ?? null,
          };
        }
      )
      // Handle Rejected requests
      .addMatcher(
        isAnyOf(
          getConsumptionForToday.rejected,
          createConsumptionRecord.rejected,
          deleteConsumptionRecord.rejected,
          getWaterStatisticsForDateRange.rejected,
          updateConsumptionRecord.rejected
        ),
        (state, { error, payload, type, meta }) => {
          state[getStateKey(type, meta)] = {
            isLoading: false,
            error: payload ?? error.message,
            key: null,
          };
        }
      );
  },
});

export const waterReducer = waterSlice.reducer;
