import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  getMonthPercentageThunk,
  updateWaterRateThunk,
  addWaterRateThunk,
  getWaterPerDayThunk,
  updateWaterThunk,
  deleteWaterThunk,
} from './operations';

const initialState = {
  waterRate: null,
  isLoading: false,
  error: null,
  percentOfDailyNorm: null,
  itemsPerMonth: [],
  listWaterOfDay: [],
};

const handlePending = state => {
  state.error = null;
  state.isLoading = true;
};

const handleRejected = state => {
  state.isLoading = false;
};

const waterSlice = createSlice({
  name: 'water',
  initialState,
  extraReducers: builder =>
    builder
      .addCase(getMonthPercentageThunk.fulfilled, (state, { payload }) => {
        state.itemsPerMonth = payload;
      })
      .addCase(updateWaterRateThunk.fulfilled, (state, { payload }) => {
        state.waterRate = payload.waterRate;
      })
      .addCase(addWaterRateThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.listWaterOfDay.push(payload.addedWaterRecord);
      })
      .addCase(getWaterPerDayThunk.fulfilled, (state, { payload }) => {
        state.listWaterOfDay = payload.arreyWaterRecords;
        state.percentOfDailyNorm = payload.percentOfDailyNorm;
      })
      .addCase(updateWaterThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const { _id } = payload.updatedWaterRecord;
        state.listWaterOfDay = state.listWaterOfDay.map(water =>
          water._id === _id ? payload.updatedWaterRecord : water
        );
      })
      .addCase(deleteWaterThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const { _id } = payload.deletedWaterRecord;
        state.listWaterOfDay = state.listWaterOfDay.map(
          water => water._id !== _id
        );
      })
      .addMatcher(
        isAnyOf(
          getMonthPercentageThunk.pending,
          updateWaterRateThunk.pending,
          addWaterRateThunk.pending,
          getWaterPerDayThunk.pending,
          updateWaterThunk.pending,
          deleteWaterThunk.pending,
          handlePending
        )
      )
      .addMatcher(
        isAnyOf(
          getMonthPercentageThunk.rejected,
          updateWaterRateThunk.rejected,
          addWaterRateThunk.rejected,
          getWaterPerDayThunk.rejected,
          updateWaterThunk.rejected,
          deleteWaterThunk.rejected,
          handleRejected
        )
      ),
});

export const waterReducer = waterSlice.reducer;
