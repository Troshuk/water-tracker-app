import { createAsyncThunk } from '@reduxjs/toolkit';

export const createAsyncThunkWithCatch = (typePrefix, asyncThunkFunction) =>
  createAsyncThunk(typePrefix, (payload, thunkAPI) =>
    asyncThunkFunction(payload, thunkAPI).catch(error =>
      thunkAPI.rejectWithValue({
        message: 'Server is not available right now, please try a little later',
        status: error?.response?.status ?? 500,
        ...error?.response?.data,
      })
    )
  );
