import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import {
  getConsumptionForToday,
  createConsumptionRecord,
  deleteConsumptionRecord,
  getWaterStatisticsForDateRange,
  updateConsumptionRecord,
  getConsumptionForDay,
} from './operations';

const getStateKey = (type, meta) => type.replace(`/${meta.requestStatus}`, '');

const initialState = {
  today: {
    consumptionPercentage: 0,
    consumption: [],
  },
  viewingDate: null,
  calendarStatistics: [],
  ...[
    getConsumptionForToday,
    createConsumptionRecord,
    deleteConsumptionRecord,
    getWaterStatisticsForDateRange,
    updateConsumptionRecord,
    getConsumptionForDay,
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
  reducers: {
    updateViewingDate(state, { payload }) {
      state.viewingDate = payload;
    },
  },

  extraReducers: builder => {
    builder
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

      // Get consumption for today or date
      .addMatcher(
        isAnyOf(
          getConsumptionForToday.fulfilled,
          getConsumptionForDay.fulfilled
        ),
        (state, { payload }) => {
          state.today = payload;
        }
      )

      // Handle fulfilled requests status
      .addMatcher(
        isAnyOf(
          getConsumptionForToday.fulfilled,
          createConsumptionRecord.fulfilled,
          deleteConsumptionRecord.fulfilled,
          getWaterStatisticsForDateRange.fulfilled,
          updateConsumptionRecord.fulfilled,
          getConsumptionForDay.fulfilled
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
          updateConsumptionRecord.pending,
          getConsumptionForDay.pending
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
          updateConsumptionRecord.rejected,
          getConsumptionForDay.rejected
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

export const { updateViewingDate } = waterSlice.actions;

export const waterReducer = waterSlice.reducer;
