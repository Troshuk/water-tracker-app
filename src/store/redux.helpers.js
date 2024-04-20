import { createAsyncThunk } from '@reduxjs/toolkit';

export const createAsyncThunkWithCatch = (typePrefix, asyncThunkFunction) =>
  createAsyncThunk(typePrefix, (payload, thunkAPI) =>
    asyncThunkFunction(payload, thunkAPI).catch(error =>
      thunkAPI.rejectWithValue(
        error?.response?.data ?? {
          message:
            'Server is not available right now, please try a little later',
        }
      )
    )
  );
