import { api } from 'store/auth/operations';
import { createAsyncThunkWithCatch } from 'store/redux.helpers';

const WATER_ENDPOINT = 'water/';
const WATER_CONSUMPTION_ENDPOINT = WATER_ENDPOINT + 'consumption/';

export const getConsumptionForToday = createAsyncThunkWithCatch(
  'water/getConsumptionForToday',
  async () => (await api.get(WATER_ENDPOINT + 'today')).data
);

export const getConsumptionForDay = createAsyncThunkWithCatch(
  'water/getConsumptionForDay',
  async date => (await api.get(WATER_ENDPOINT + 'day/' + date)).data
);

export const createConsumptionRecord = createAsyncThunkWithCatch(
  'water/createConsumptionRecord',
  async water => (await api.post(WATER_CONSUMPTION_ENDPOINT, water)).data
);

export const deleteConsumptionRecord = createAsyncThunkWithCatch(
  'water/deleteConsumptionRecord',
  async id => (await api.delete(WATER_CONSUMPTION_ENDPOINT + id)).data
);

export const getWaterStatisticsForDateRange = createAsyncThunkWithCatch(
  'water/getWaterStatisticsForDateRange',
  async ({ fromDate, toDate }) =>
    (await api.get(WATER_ENDPOINT + `statistics/${fromDate}/${toDate}`)).data
);

export const updateConsumptionRecord = createAsyncThunkWithCatch(
  'water/updateConsumptionRecord',
  async ({ id, updatedData }) =>
    (await api.patch(WATER_CONSUMPTION_ENDPOINT + id, updatedData)).data
);
