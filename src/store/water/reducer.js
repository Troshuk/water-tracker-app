import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import {
  getConsumptionForToday,
  createConsumptionRecord,
  deleteConsumptionRecord,
} from './operations';

const getStateKey = (type, meta) => type.replace(`/${meta.requestStatus}`, '');

const initialState = {
  today: {
    consumptionPercentage: 0,
    consumption: [],
  },
  ...[
    getConsumptionForToday,
    createConsumptionRecord,
    deleteConsumptionRecord,
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

      // Handle fulfilled requests status
      .addMatcher(
        isAnyOf(
          getConsumptionForToday.fulfilled,
          createConsumptionRecord.fulfilled,
          deleteConsumptionRecord.fulfilled
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
          deleteConsumptionRecord.pending
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
          deleteConsumptionRecord.rejected
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
